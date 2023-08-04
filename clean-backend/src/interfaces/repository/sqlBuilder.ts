import { Filter, ServerConfig } from ".";
import { serializeSql } from "../../framework/database";

type SelectInput = {
  table: string;
  alias: string;
  columns: string;
  joins: string;
  where: string;
  order: string;
  limit: number;
  offset: number;
};

export default class SqlBuilder<Entity> {
  private _select({
    table,
    alias,
    columns,
    joins,
    where,
    order,
    limit,
    offset,
  }: SelectInput) {
    const SQL = `
      SELECT
        ${columns}
      FROM (
        SELECT DISTINCT ON (${order.replace("DESC", "")}) ${alias}.*
        FROM ${table} ${alias}
        ${joins}
        WHERE ${where}
        ORDER BY ${order}
        LIMIT ${limit} OFFSET ${offset}
      ) ${alias}
      ${joins}
      ORDER BY ${order}
    `;

    return serializeSql(SQL);
  }

  paginate(config: ServerConfig<Entity>, filter: Filter) {
    console.log({ filter });
    const limit = filter.limit;
    const offset = limit * (filter.page - 1);
    const EXTRA_WHERE = filter.where ? filter.where : "";
    const where = `CONCAT_WS(' ', ${config.searchColumns.join(
      ","
    )}) ILIKE ALL (string_to_array('${filter.search
      .split(" ")
      .map((s) => `%${s}%`) // SQL Injection Alert!
      .join(",")}', ',')) ${EXTRA_WHERE}`;

    const columns = config.columns.join(",");
    const joins = config.joins.join(" ");

    const table = config.table;
    const alias = config.alias;

    // order
    const hasFilterOrderKey = !!filter.order;
    const orderKey = hasFilterOrderKey
      ? filter.order
      : Object.keys(config.orderOptions)[0];
    const orderOption = config.orderOptions[orderKey];
    orderOption.push(`${config.alias}.id`); // adiciona o id sempre para evitar que agrupe por valor iguais de outras colunas

    if (hasFilterOrderKey) {
      const firstIsAsc = !orderOption[0].includes(" DESC");
      const filterIsAsc = !filter.desc;
      if (firstIsAsc && !filterIsAsc) {
        orderOption[0] += " DESC";
      }
      if (!firstIsAsc && filterIsAsc) {
        orderOption[0] = orderOption[0].replace(" DESC", "");
      }
    }
    const order = orderOption.join(",");

    return this._select({
      table,
      alias,
      columns,
      joins,
      where,
      order,
      limit,
      offset,
    });
  }

  getById(config: ServerConfig<Entity>, id: number) {
    const safeId = +id;
    const limit = 1;
    const offset = 0;
    const where = `${config.alias}.id=${safeId}`;

    const columns = [...config.columns, ...config.extra.columns].join(", ");
    const joins = [...config.joins, ...config.extra.joins].join(" ");

    const order = `${config.alias}.id`;
    const table = config.table;
    const alias = config.alias;

    return this._select({
      table,
      alias,
      columns,
      joins,
      where,
      order,
      limit,
      offset,
    });
  }
}
