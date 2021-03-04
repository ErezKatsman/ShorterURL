const express = require("express");
const router = express.Router();
const DataBase = require("../Classes/DBclass");
const bodyParser = require("body-parser");
const DB = new DataBase();
router.use(bodyParser.json());

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   DB.getFromData();
//   DB.dataURL.forEach((url) => {
//     if (url.shortURLid === id) {
//       res.status(302).redirect(url.originalURL);
//     }
//   });
// });

router.post("/", (req, res) => {
  const { url } = req.body;
  DB.addUrl(url).then((isAdded) => {
    res.status(200).json({ success: true, method: "POST", AddedURL: isAdded });
  });
});

// router.get("/:id", (req, res) => {});

module.exports = router;
