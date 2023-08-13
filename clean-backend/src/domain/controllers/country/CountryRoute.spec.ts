import request from "supertest";
import app from "../../../app/config/app";
import { CreateCountryInput } from "../../usecases/Country/country.dto";

describe("E2E country entity test", () => {
  it("should create a country", async () => {
    const input: CreateCountryInput = {
      name: "Germany",
      abbr: "GE",
    };
    const formData = new FormData();
    for (let key in input) {
      formData.append(key, input[key]);
    }
    console.log(JSON.stringify(formData));
    const response = await request(app)
      .post("/api/country")
      .set("Content-Type", "multipart/form-data")
      .send(formData);

    expect(response.status).toBe(200);
  });
});
