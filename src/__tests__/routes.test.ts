import app from "../server";
import supertest from "supertest";

describe("GET '/", () => {
  it("Should send back some basic data", async () => {
    const res = await supertest(app).get("/");

    const expected = "Hello, world!";
    expect(res.body.message).toBe(expected);
  });
});
