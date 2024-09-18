const request = require("supertest");
const app = require("../server");

describe("GET /api/search", () => {
  it("should return search results for a valid query", async () => {
    const response = await request(app)
      .get("/api/search")
      .query({ term: "Beatles", media: "music" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("results");
    expect(response.body.results.length).toBeGreaterThan(0);
  });

  it("should return an error for an invalid query", async () => {
    const response = await request(app)
      .get("/api/search")
      .query({ term: "", media: "" });

    expect(response.status).toBe(400); // Expecting 400 for invalid queries
  });
});
