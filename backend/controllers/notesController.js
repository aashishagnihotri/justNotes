var dbFunctions = require("../config/dbConfig");
const crypto = require("crypto");

const fetchNotes = (userId) => {
  console.log("userid in controller: ", userId);
  return dbFunctions
    .connectToDB()
    .then(async (db) => {
      const cursor = await db
        .collection("Notes")
        .find(
          { userId: userId, delFlg: { $exists: false } },
          { _id: 0, userId: 0, note: 1, noteId: 1 }
        )
        .toArray();
      return {
        status: 200,
        notes: cursor.map((note) => {
          return {
            noteId: note.noteId,
            note: note.note,
          };
        }),
      };
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.message,
      };
    })
    .finally(() => {
      return dbFunctions.closeConnect();
    });
};

const addNote = ({ userId, note }) => {
  const noteId = crypto.randomUUID();
  return dbFunctions.connectToDB().then(async (db) => {
    return db
      .collection("Notes")
      .insertOne({ userId: userId, note: note, noteId: noteId })
      .then((response) => {
        if (response.insertedId) {
          return {
            status: 200,
            message: "Note Added",
          };
        } else {
          return {
            status: 500,
            message: "Some Error Occured!",
          };
        }
      })
      .catch((error) => {
        return {
          status: 500,
          message: error.message,
        };
      })
      .finally(() => {
        return dbFunctions.closeConnect();
      });
  });
};
const editNote = ({ userId, noteId, newNote }) => {
  return dbFunctions
    .connectToDB()
    .then(async (db) => {
      return db
        .collection("Notes")
        .findOneAndUpdate(
          { userId: userId, noteId: noteId },
          { $set: { note: newNote } }
        )
        .then((response) => {
          if (response.lastErrorObject.updatedExisting) {
            return {
              status: 200,
              message: "Note Updated",
            };
          } else {
            return {
              status: 500,
              message: "Some Error Occured!",
            };
          }
        })
        .catch((err) => {
          return {
            status: 500,
            message: err.message,
          };
        });
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.message,
      };
    })
    .finally(() => {
      return dbFunctions.connectToDB();
    });
};
const deleteNote = ({ noteId }) => {
  return dbFunctions
    .connectToDB()
    .then(async (db) => {
      return db
        .collection("Notes")
        .findOneAndUpdate({ noteId: noteId }, { $set: { delFlg: 1 } })
        .then((response) => {
          if (response.lastErrorObject.updatedExisting) {
            return {
              status: 200,
              message: "Note Deleted",
            };
          } else {
            return {
              status: 500,
              message: "Some Error Occured!",
            };
          }
        });
    })
    .catch((error) => {
      return { status: 500, message: error.message };
    })
    .finally(() => {
      return dbFunctions.closeConnect();
    });
};

module.exports = { fetchNotes, addNote, editNote, deleteNote };
