const express = require("express");
const router = express.Router();
const DataBase = require("../Classes/DBclass");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const DB = new DataBase();
router.use(bodyParser.json());

router.get("/:id", (req, res) => {
  const { id } = req.params;
  DB.loadData().then(() => {
    DB.dataURL.forEach((url) => {
      if (JSON.stringify(url.shortURLid) == id) {
        return res.status(302).redirect(url.originalURL);
      }
    });
    res
      .status(404)
      .json({ success: false, method: "POST", meassage: "Invalid url adress" });
  });
});

router.post("/", (req, res) => {
  const { url } = req.body;
  DB.addUrl(url).then((isAdded) => {
    res.status(200).json({ success: true, method: "POST", meassage: isAdded });
  });
});

// router.get("/:id", (req, res) => {});

module.exports = router;
