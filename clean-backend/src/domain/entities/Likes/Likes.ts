import InvalidParamError from "../../../interfaces/errors/invalid-param";
import MissingParamError from "../../../interfaces/errors/missing-param";
import { z } from "zod";
import Post from "../Post/Post";
import User from "../User/User";

interface LikesInput {
  id?: string;
  post: Post;
  user: User;
  user_id: number;
  post_id: number;
}

export default class Likes {
  _id?: string;
  _post: Post;
  _user: User;
  _user_id: number;
  _post_id: number;

  constructor({ id, post, user, post_id, user_id }: LikesInput) {
    this.id = id;
    this.post = post;
    this.user = user;
    this.post_id = post_id;
    this.user_id = user_id;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id ? z.string().parse(id) : id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    if (!name) throw new MissingParamError("name");
    this._name = name;
  }

  get abbr(): string {
    return this._abbr;
  }

  set abbr(abbr: string) {
    if (!abbr) throw new MissingParamError("abbr");
    if (abbr.length > 3) throw new InvalidParamError("abbr");

    this._abbr = abbr;
  }

  get sort(): number {
    return this._sort;
  }

  set sort(sort: number | undefined) {
    this._sort = sort;
  }

  get created(): Date {
    return this._created;
  }

  set created(created: Date | undefined) {
    this._created = created;
  }
}
