import React from "react";
import styles from "./card.module.scss";

const Card = ({ noteId, color, note, setOpenNote, setCurrentNote }) => {
  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundColor: color }}
      onClick={() => {
        setOpenNote(true);
        setCurrentNote({ noteId: noteId, note: note });
      }}
    >
      {note}
    </div>
  );
};

export default Card;
