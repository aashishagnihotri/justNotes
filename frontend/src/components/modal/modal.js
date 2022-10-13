import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "@mui/material";
import { addNote, updateNote } from "../../redux/notes/reducer";
import styles from "./modal.module.scss";

const NoteModal = ({ id, note, isOpen, setIsOpen, isNew }) => {
  const dispatch = useDispatch();
  const [openNote, setOpenNote] = useState({
    id: id,
    note: note,
  });
  useEffect(() => {
    setOpenNote({ id: id, note: note });
  }, [id, note]);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          if (isNew === true) {
            dispatch(addNote({ id: openNote.id, note: openNote.note }));
          } else {
            dispatch(updateNote({ id: openNote.id, note: openNote.note }));
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
