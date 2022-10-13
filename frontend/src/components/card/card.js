import React from "react";
import styles from "./card.module.scss";

const Card = ({ id, note, setOpenNote, setCurrentNote }) => {
  return (
    <div
      className={styles.cardContainer}
      onClick={() => {
        setOpenNote(true);
        setCurrentNote({ id: id, note: note });
      }}
    >
      {note}
    </div>
  );
};

export default Card;
