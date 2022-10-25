const express = require("express");
const router = express.Router();

let notes = [
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
];

router.get("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.send(notes);
});

router.post("/add", (req, res, next) => {
  notes.push({ id: req.body.id, note: req.body.note });
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send({ data: "Note Added" });
});

router.post("/edit", (req, res, next) => {
  notes.map((note) => {
    if (note.id === req.body.id) {
      note.note = req.body.note;
    }
  });
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send({ data: "Note Updated" });
});
module.exports = router;
