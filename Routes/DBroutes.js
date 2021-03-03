const express = require("express");
const router = express.Router();
const DataBase = require("../Classes/DBclass");
const DB = new DataBase();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  DB.getFromData();
  DB.dataURL.forEach((url) => {
    if (url.shortURLid === id) {
      res.status(302).redirect(url.originalURL);
    }
  });
});

router.post("/", (req, res) => {
  try {
    res.status(200).json({
      message: "handling POST request to /database",
    });
  } catch (err) {
    res.status(404).json(`failed to POST: ${err}`);
  }
});

router.get("/:id", (req, res) => {});

module.exports = router;
