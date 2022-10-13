import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import NoteModal from "../../components/modal/modal";
import Card from "../../components/card/card";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotes,
  getNotesStatus,
  getNotesError,
  getNotes,
} from "../../redux/notes/reducer";
import styles from "./home.module.scss";
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
    if (checkNotesStatus === "idle") {
      dispatch(fetchNotes());
    }
  }, [checkNotesStatus, dispatch]);
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
              .map((note) => {
                return (
                  <div key={note.id}>
                    <Card
                      id={note.id}
                      note={note.note}
                      setOpenNote={setIsOpen}
                      setCurrentNote={setCurrentNote}
                    />
                  </div>
                );
              })
          ) : (
            <h1>No Notes Found...</h1>
          )}
        </div>
      ) : checkNotesStatus === "loading" ? (
        <div>
          <h1>LOADING.....</h1>
        </div>
      ) : checkNotesStatus === "failed" ? (
        <h1>{checkNotesError}</h1>
      ) : null}
      <NoteModal
        id={currentNote.id}
        note={currentNote.note}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isNew={false}
      />
    </>
  );
};

export default Home;
