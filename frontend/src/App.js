import React, { useState } from "react";
import {
  Paper,
  Box,
  IconButton,
  InputBase,
  TextField,
  Modal,
  Divider,
  Grid,
  Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
  const [noteList, setNoteList] = useState(notes);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    note: "",
  });
  return (
    <>
      <h1>Notes</h1>
      <Paper elevation={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Input
            fullWidth
            type="text"
            id="searchBar"
            placeholder="Search Notes"
            onChange={(e) => {
              console.log("target value: ", e.target.value);
            }}
          />
          <IconButton type="button" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
        <Divider orientation="horizontal" variant="fullWidth" />
        <Grid column={4} container={true}>
          {noteList.map((note) => {
            return (
              <Paper
                key={note.id}
                elevation={4}
                sx={{
                  width: "300px",
                  height: "225px",
                  margin: "16px",
                  backgroundColor: "#F3E779",
                }}
                onClick={() => {
                  setOpenNote(true);
                  setCurrentNote(note);
                }}
              >
                {note.note}
              </Paper>
            );
          })}
        </Grid>
        <Modal
          open={openNote}
          onClose={() => {
            setOpenNote(false);
          }}
        >
          <Box
            sx={{
              margin: "75px",
              height: "300px",
              width: "90%",
              backgroundColor: "#F3E779",
            }}
          >
            {currentNote.note}
          </Box>
        </Modal>
      </Paper>
    </>
  );
};

export default App;
