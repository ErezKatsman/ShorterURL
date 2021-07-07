const fs = require("fs").promises;
const ShorterURL = require("./URLclass");

class DataBase {
  constructor() {
    this.dataURL = [];
  }

  //checks if original url exists in DB
  isExist(originalURL) {
    return (
      this.dataURL.findIndex(
        (urlElement) => urlElement.originalURL === originalURL
      ) !== -1
    );
  }

  // if it added return the new url OBJ -- if not return NULL
  async addUrl(url) {
    await this.loadData();
    if (this.isExist(url)) {
      const urlItem = this.dataURL.find(
        (urlElement) => urlElement.originalURL === url
      );
      return urlItem;
    } else {
      const urlItem = new ShorterURL(url);
      this.dataURL.push(urlItem);
      this.saveData();
      return urlItem;
    }
  }

  // loading data
  loadData() {
    return new Promise((resolve, reject) =>
      fs
        .readFile("./DATABASE.json", "utf-8")
        .then((data) => {
          this.dataURL = JSON.parse(data);
          resolve();
        })
        .catch((err) => {
          reject(err);
          throw new Error(`can not load data: ${err}`);
        })
    );
  }

  //saving data
  saveData() {
    const urls = this.dataURL;
    fs.writeFile("./DATABASE.json", JSON.stringify(urls)).catch((err) => {
      throw new Error(`can not save data: ${err}`);
    });
  }

  //checks if the url is valid
  validURL(str) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
}

module.exports = DataBase;
