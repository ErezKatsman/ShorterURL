const request = require("supertest");
const app = require("../app.js");

const ValidUrlJSON = { url: "https://google.com" };
const InValidUrlJSON = { url: "httls://google.com" };

const validUrlResponse = {
  success: true,
  method: "POST",
  meassage: {
    originalURL: "https://google.com",
    shortURLid: 1614858365860,
    creationDate: "4/3/2021",
    redirectCount: 0,
  },
};
const invalidUrlResponse = {
  success: false,
  method: "post",
  meassage: "Invalid URL adress",
};

describe("Post route", async () => {
  test("if post a new Item in the local data with correct url", async () => {
    const response = await request(app)
      .post("/API/shorterURL")
      .send(ValidUrlJSON);
    expect(response.body).toEqual(validUrlResponse);
    expect(response.status).toBe(200);
  });
  it("should response 404 status if the url inalid", async () => {
    const response = await request(app)
      .post("/API/shorterURL")
      .send(InValidUrlJSON);
    expect(response.body).toEqual(invalidUrlResponse);
    expect(response.status).toEqual(404);
  });
});
