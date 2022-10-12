const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/notes", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.send([
    {
      id: 1,
      note: "note 1",
    },
    {
      id: 2,
      note: "note 2",
    },

    {
      id: 3,
      note: "note 3",
    },
    {
      id: 4,
      note: "note 4",
    },
    {
      id: 5,
      note: "note 5",
    },
  ]);
});
module.exports = router;
