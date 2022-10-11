import React, { useState } from "react";
import Header from "./components/header/header";
import { Modal } from "@mui/material";
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
      <Header />
      <hr style={{ borderBottom: "4px solid black", width: "100%" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          rowGap: "16px",
        }}
      >
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
      </div>
      <Modal
        open={openNote}
        onClose={() => {
          setOpenNote(false);
          handleSave(currentNote);
        }}
        children={
          <textarea
            style={{
              margin: "75px",
              height: "300px",
              width: "80%",
              padding: "32px",
              backgroundColor: "#F3E779",
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "flex-start",
            }}
            onChange={(e) => {
              setCurrentNote({ ...currentNote, note: e.target.value });
            }}
            defaultValue={currentNote.note}
          />
        }
      ></Modal>
    </>
  );
};

export default App;
