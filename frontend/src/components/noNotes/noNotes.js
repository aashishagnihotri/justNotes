import React, { useState } from "react";
import NoteModal from "../modal/modal";
import styles from "./noNotes.module.scss";

const NoNotes = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.noNoteContainer}>
      <div className={styles.title}>No Notes Found.</div>
      <div>
        <button
          className={styles.addNote}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add a Note
        </button>
      </div>
      {setOpen ? (
        <NoteModal
          id={""}
          note={""}
          isOpen={open}
          setIsOpen={setOpen}
          isNew={true}
        />
      ) : null}
    </div>
  );
};

export default NoNotes;
