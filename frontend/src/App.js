import React, { useState } from "react";
import { Modal, Divider, Grid } from "@mui/material";
const notes = [
  {
    id: 1,
    note: "A quick and a brown fox",
  },
  {
    id: 2,
    note: "jumped over a lazy dog",
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

const App = () => {
  const [openNote, setOpenNote] = useState(false);
  const [search, setSearch] = useState("");
  const [noteList, setNoteList] = useState(notes);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    note: "",
  });

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };
  const handleSave = (currentNote) => {
    setNoteList(
      noteList.map((note) => {
        if (note.id === currentNote.id) {
          return { ...note, note: currentNote.note };
        }
        return note;
      })
    );
  };
  return (
    <>
      <div>
        <h1>Notes</h1>
        <span>
          <input
            style={{
              width: "100%",
              height: "32px",
              border: "0px solid white",
            }}
            type="text"
            id="searchBar"
            placeholder="Search Notes"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </span>
      </div>
      <Divider orientation="horizontal" variant="fullWidth" />
      <Grid container={true}>
        {noteList
          .filter((note) => {
            return note.note.toLowerCase().includes(search.toLowerCase());
          })
          .map((note) => {
            return (
              <div
                style={{
                  boxShadow: "2.5px 5px 5px black",
                  padding: "8px",
                  width: "300px",
                  height: "225px",
                  margin: "16px",
                  backgroundColor: "#F3E779",
                  borderRadius: "4px",
                }}
                key={note.id}
                onClick={() => {
                  setOpenNote(true);
                  setCurrentNote(note);
                }}
              >
                {note.note}
              </div>
            );
          })}
      </Grid>
      <Modal
        open={openNote}
        onClose={() => {
          setOpenNote(false);
          handleSave(currentNote);
        }}
        children={
          <input
            style={{
              margin: "75px",
              height: "300px",
              width: "80%",
              padding: "32px",
              backgroundColor: "#F3E779",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
            defaultValue={currentNote.note}
            onChange={(e) => {
              setCurrentNote({ ...currentNote, note: e.target.value });
            }}
          />
        }
      ></Modal>
    </>
  );
};

export default App;
