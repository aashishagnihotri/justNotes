import React from "react";
import styles from "./card.module.scss";

const Card = ({ id, color, note, setOpenNote, setCurrentNote }) => {
  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundColor: color }}
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
