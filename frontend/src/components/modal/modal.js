import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "@mui/material";
import { addNote, editNote } from "../../redux/notes/reducer";
import styles from "./modal.module.scss";

const NoteModal = ({ noteId, note, isOpen, setIsOpen, isNew }) => {
  const dispatch = useDispatch();
  const [openNote, setOpenNote] = useState({
    noteId: noteId,
    note: note,
  });
  console.log("note in modal: ", { noteId: noteId, note: note });
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    setOpenNote({ noteId: noteId, note: note });
  }, [noteId, note]);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          if (isNew === true) {
            dispatch(addNote({ userId: userId, note: openNote.note }));
          } else {
            dispatch(
              editNote({
                userId: userId,
                noteId: openNote.noteId,
                note: openNote.note,
              })
            );
          }
          setOpenNote({});
          setIsOpen(false);
        }}
        children={
          <textarea
            className={styles.noteArea}
            onChange={(e) => {
              setOpenNote({ ...openNote, note: e.target.value });
            }}
            defaultValue={openNote.note}
          />
        }
      ></Modal>
    </>
  );
};

export default NoteModal;
