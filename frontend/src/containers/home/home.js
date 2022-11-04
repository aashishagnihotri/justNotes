import React, { useState, useEffect } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import Header from "../../components/header/header";
import NoteModal from "../../components/modal/modal";
import Card from "../../components/card/card";
import NoNotes from "../../components/noNotes/noNotes";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotes,
  getNotesStatus,
  getNotesError,
  getNotes,
} from "../../redux/notes/reducer";
import styles from "./home.module.scss";
import { COLOR_CODES } from "../../helpers/helper";
const Home = () => {
  const dispatch = useDispatch();

  const notesList = useSelector(getNotes);
  const checkNotesStatus = useSelector(getNotesStatus);
  const checkNotesError = useSelector(getNotesError);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentNote, setCurrentNote] = useState({});

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };
  useEffect(() => {
    if (checkNotesStatus === "idle" && localStorage.getItem("userId")) {
      dispatch(fetchNotes({ userId: localStorage.getItem("userId") }));
    }
  }, [checkNotesStatus, dispatch]);
  console.log("note: ", currentNote);
  return (
    <>
      <Header handleSearch={handleSearch} />
      <hr className={styles.divider} />
      {checkNotesStatus === "success" && notesList && notesList.length > 0 ? (
        <div className={styles.noteContainer}>
          {notesList.filter((note) => {
            return note.note.toLowerCase().includes(search.toLowerCase());
          }).length > 0 ? (
            notesList
              .filter((note) => {
                return note.note.toLowerCase().includes(search.toLowerCase());
              })
              .map((note, index) => {
                return (
                  <div key={note.noteId}>
                    <Card
                      noteId={note.noteId}
                      color={COLOR_CODES[index % 4]}
                      note={note.note}
                      setOpenNote={setIsOpen}
                      setCurrentNote={setCurrentNote}
                    />
                  </div>
                );
              })
          ) : (
            <>
              <div className={styles.noNote}>
                0 Notes found for the current search
              </div>
            </>
          )}
        </div>
      ) : checkNotesStatus === "loading" ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={checkNotesStatus === "loading" ? true : false}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : checkNotesStatus === "failed" ? (
        <h1>{checkNotesError}</h1>
      ) : notesList.length < 1 ? (
        <NoNotes />
      ) : null}
      <NoteModal
        noteId={currentNote.noteId}
        note={currentNote.note}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isNew={false}
      />
    </>
  );
};

export default Home;
