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

  // if it added return the new url OBJ -- if not return NULL
  async addUrl(url) {
    await this.loadData();
    if (this.isExist(url)) {
      return this.dataURL.find((urlElement) => urlElement.originalURL === url)
        .shortURLid;
    } else {
      const urlItem = new ShorterURL(url);
      console.log(urlItem);
      this.dataURL.push(urlItem);
      this.saveData();
      return urlItem;
    }
  }

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

  saveData() {
    const urls = this.dataURL;
    fs.writeFile("./DATABASE.json", JSON.stringify(urls)).catch((err) => {
      throw new Error(`can not save data: ${err}`);
    });
  }

  // getAllDATA() {
  //   // fs.readFile ====>>
  //   return newArray;
  // }
}

module.exports = DataBase;
