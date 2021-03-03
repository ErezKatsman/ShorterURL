const fs = require("fs").promises;
const ShorterURL = require("./URLclass");

class DataBase {
  constructor() {
    this.dataURL = [];
  }

  isExist(originalURL) {
    return (
      this.dataURL.findIndex(
        (urlElement) => urlElement.originalURL === originalURL
      ) !== -1
    );
  }

  getFromData() {
    fs.readFile("../DATABASE.json", "utf-8").then((data) => {
      this.dataURL = JSON.parse(data);
    });
  }

  addUrl(url) {
    if (this.isExist(url)) {
      this.dataURL.find((urlElement) => urlElement.originalURL === url)
        .redirectCount++;
      return this.save();
    } else {
      const urlItem = new ShorterURL(url);
      urlItem.redirectCount++;
      this.dataURL.push(urlItem);
      return this.save();
    }
  }

  save() {
    const urls = this.dataURL;
    return fs
      .writeFile("./DATABASE.json", JSON.stringify(urls))
      .catch((err) => {
        throw new Error(`can not save data: ${err}`);
      });
  }
}

module.exports = DataBase;
