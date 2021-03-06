const request = require("supertest");
const app = require("../app.js");
const fs = require("fs");
const { response } = require("../app.js");
const validTestJson = { url: "https://www.test123.com/" };
const ValidUrlJSON = {
  url:
    "https://www.google.com/search?q=dfsdfdsfdsfddHGFHHFGHFgfjhghjkhgjk&oq=dfsdfdsfdsfddsfdsfdsddsdfsdfdsfdsgfjhghjkhgjk&aqs=chrome..69i57.3965j0j15&sourceid=chrome&ie=UTF-8",
};
const InValidUrlJSON = { url: "httls://google.com" };

const validUrlShorterId = 1615042437523;

const validUrlResponse = {
  success: true,
  method: "POST",
  message: {
    originalURL:
      "https://www.google.com/search?q=dfsdfdsfdsfddHGFHHFGHFgfjhghjkhgjk&oq=dfsdfdsfdsfddsfdsfdsddsdfsdfdsfdsgfjhghjkhgjk&aqs=chrome..69i57.3965j0j15&sourceid=chrome&ie=UTF-8",
    shortURLid: 1615055119949,
    creationDate: "6/3/2021",
    redirectCount: 0,
  },
};
const invalidUrlResponse = {
  success: false,
  method: "post",
  message: "Invalid URL adress",
};

describe("POST route", () => {
  test("if post a new Item in the local data with correct url", async () => {
    const response = await request(app)
      .post("/api/shorterurl")
      .send(ValidUrlJSON);
    expect(response.body).toEqual(validUrlResponse);
    expect(response.status).toBe(200);
  });
  it("should response 404 status if the url inalid", async () => {
    const response = await request(app)
      .post("/api/shorterurl")
      .send(InValidUrlJSON);
    expect(response.body).toEqual(invalidUrlResponse);
    expect(response.status).toEqual(404);
  });

  test("if the POST method add to the database with new and valid URL", async () => {
    const urlDataBefore = JSON.parse(
      fs.readFileSync("./DATABASE.JSON", "utf-8")
    );
    await request(app).post("/api/shorterurl").send(validTestJson);
    const urlDataAfter = JSON.parse(
      fs.readFileSync("./DATABASE.JSON", "utf-8")
    );
    expect(urlDataBefore.length).toBe(urlDataAfter.length - 1);
    fs.writeFileSync("./DATABASE.JSON", JSON.stringify(urlDataBefore));
  });
});

describe("GET route", () => {
  test("if a correct shorter url redirect to the right url", async () => {
    const response = await request(app).get(
      `/api/shorterurl/${validUrlShorterId}`
    );
    expect(response.status).toEqual(302);
  });
});
