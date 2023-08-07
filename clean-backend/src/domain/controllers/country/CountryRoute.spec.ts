import request from "supertest";
import app from "../../../app/config/app";
import { CreateCountryInput } from "../../usecases/Country/country.dto";

describe("E2E country entity test", () => {
  it("should create a country", async () => {
    const input: CreateCountryInput = {
      name: "Germany",
      abbr: "GE",
    };
    const response = await request(app).post("/api/country").send(input);

    expect(response.status).toBe(200);
  });
});
