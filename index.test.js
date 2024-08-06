// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician, Band } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

beforeAll(async () => {
  await db.sync({ force: true });
});

afterEach(async () => {
  await db.truncate({ cascade: true }); // cascade will remove assosiated data
});

describe("./musicians endpoint", () => {
  it("returns 200 status code", async () => {
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
  });
  it("returns an array of Musician", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);
    expect(Array.isArray(responseData)).toBe(true);
  });
});

describe("./bands endpoint", () => {
  it("returns 200 status code", async () => {
    const response = await request(app).get("/bands");
    expect(response.statusCode).toBe(200);
  });
  it("returns an array of Band", async () => {
    const response = await request(app).get("/bands");
    const responseData = JSON.parse(response.text);
    expect(Array.isArray(responseData)).toBe(true);
  });
});

describe("Express Musicians endpoint", () => {
  it("returns 200 status code", async () => {
    const response = await request(app).get("/musicians/:id");
    expect(response.statusCode).toBe(200);
  });
  it("returns an object of Musician", async () => {
    const response = await request(app).get("/musicians/:id");
    const responseData = JSON.parse(response.text);
    expect(typeof response).toBe("object");
  });
});
