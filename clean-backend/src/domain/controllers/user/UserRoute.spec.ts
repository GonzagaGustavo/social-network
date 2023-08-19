import request from "supertest";
import app from "../../../app/config/app";
import { CreateUserInput } from "../../usecases/User/user.dto";

describe("E2E user entity test", () => {
  it("should create a user", async () => {
    const input: CreateUserInput = {
      username: "gustavo",
      name: "Gustavo Gonzaga",
      email: "gustavogonzaga.gg243@gmail.com",
      password: "12345678",
      bio: "Qualquer bio",
      birthday: "2005-11-26",
      gender: "Male",
    };
    const formData = new FormData();
    for (let key in input) {
      formData.append(key, input[key]);
    }

    const response = await request(app)
      .post("/api/user")
      .set("Content-Type", "multipart/form-data")
      .field("username", "gustavo")
      .field("name", "Gustavo Gonzaga")
      .field("email", "gustavogonzaga.gg243@gmail.com")
      .field("password", "12345678")
      .field("bio", "Qualquer bio")
      .field("birthday", "2005-11-26")
      .field("gender", "Male");

    expect(response.status).toBe(200);
  });
});
