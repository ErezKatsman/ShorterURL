const express = require("express");
const router = express.Router();
const DataBase = require("../Classes/DBclass");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const DB = new DataBase();
router.use(bodyParser.json());

//redirecting to the original endpoint with the shorer url
router.get("/:id", (req, res) => {
  const { id } = req.params;
  DB.loadData()
    .then(() => {
      DB.dataURL.forEach((url) => {
        if (JSON.stringify(url.shortURLid) == id) {
          url.redirectCount++;
          DB.saveData();
          return res.redirect(url.originalURL);
        }
      });
      return res.status(404).json({
        success: false,
        method: "GET",
        message: "Invalid shortenerURL adress",
      });
    })
    .catch((e) =>
      res.status(500).json({
        success: false,
        method: "GET",
        message: `error: ${e}`,
      })
    );
});

// save in the database new url
router.post("/", (req, res) => {
  const { url } = req.body;
  if (DB.validURL(url)) {
    DB.addUrl(url).then((isAdded) => {
      return res
        .status(200)
        .json({ success: true, method: "POST", message: isAdded });
    });
  } else {
    res.status(404).json({
      success: false,
      method: "post",
      message: "Invalid URL adress",
    });
  }
});

module.exports = router;
