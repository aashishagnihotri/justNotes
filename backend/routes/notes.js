const express = require("express");
const router = express.Router();
var notesController = require("../controllers/notesController");

router.get("/get", (req, res, next) => {
  console.log("cookie: ", req.headers);
  const userId = req.query.userId;
  console.log("userId: ", userId);
  return notesController
    .fetchNotes(userId)
    .then((notes) => {
      return res.send(notes);
    })
    .catch((err) => {
      return res.send({
        status: 500,
        message: err.message,
      });
    });
});

router.post("/add", (req, res, next) => {
  const { userId, note } = req.body;
  return notesController
    .addNote({ userId, note })
    .then((response) => {
      if (response.status === 200) {
        res.send({
          status: 200,
          message: response.message,
        });
      } else {
        res.send({
          status: 500,
          message: response.message,
        });
      }
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.message,
      };
    });
});

router.post("/edit", (req, res, next) => {
  const { userId, noteId, note } = req.body;
  return notesController
    .editNote({ userId: userId, noteId: noteId, newNote: note })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.message,
      };
    });
});

router.post("/delete", (req, res, next) => {
  const { noteId } = req.body;
  return notesController
    .deleteNote({ noteId: noteId })
    .then((response) => {
      return res.send(response);
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.message,
      };
    });
});

module.exports = router;
