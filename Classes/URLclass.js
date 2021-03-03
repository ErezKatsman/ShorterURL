const { url } = require("inspector");

class ShorterURL {
  constructor(originalURL) {
    this.shortURLid = Date.now();
    this.creationDate = this.formatDate(new Date());
    this.originalURL = originalURL;
    this.redirectCount = 0;
  }

  formatDate(d) {
    const curr_date = d.getDate();
    const curr_month = d.getMonth() + 1; //Months are zero based
    const curr_year = d.getFullYear();
    return curr_date + "/" + curr_month + "/" + curr_year;
  }
}

module.exports = ShorterURL;
