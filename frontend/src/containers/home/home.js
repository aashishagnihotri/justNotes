import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import NoteModal from "../../components/modal/modal";
import Card from "../../components/card/card";
import { useSelector, useDispatch } from "react-redux";
import { setNotes } from "../../redux/notes/reducer";

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

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentNote, setCurrentNote] = useState({});
  const dispatch = useDispatch();
  const getNotes = useSelector((state) => state.notes.notes);
  const isLoading = useSelector((state) => state.isLoading);
  console.log("isLoading: ", isLoading);
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };
  useEffect(() => {
    dispatch(setNotes(notes));
  }, []);
  return (
    <>
      <Header handleSearch={handleSearch} />
      <hr style={{ borderBottom: "4px solid black", width: "100%" }} />
      {getNotes && getNotes.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            rowGap: "16px",
          }}
        >
          {getNotes.filter((note) => {
            return note.note.toLowerCase().includes(search.toLowerCase());
          }).length > 0 ? (
            getNotes
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
      ) : (
        <h1>Loading...</h1>
      )}
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
