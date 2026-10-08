import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /hello", () => {
  it("returns a greeting", async () => {
    const response = await request(app)
      .get("/hello");

expect(response.status).toBe(200);

    expect(response.body).toEqual({
  message: "Hello, Developer!",
});
  });
});
describe("POST /hello", () => {
  it("returns a greeting when given a valid name", async () => {
    const response = await request(app)
      .post("/hello")
      .send({ name: "Virginia" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Hello, Virginia!",
    });
  });
  
  it("returns an error when the name is not a string", async () => {
  const response = await request(app)
    .post("/hello")
    .send({ name: 123 });

  expect(response.status).toBe(400);
  expect(response.body.error).toBe("Name is required");
});

  it("returns an error when the name is missing", async () => {
    const response = await request(app)
      .post("/hello")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Name is required",
    });
  });
});