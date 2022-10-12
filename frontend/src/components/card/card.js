import React from "react";

const Card = ({ id, note, setOpenNote, setCurrentNote }) => {
  return (
    <div
      style={{
        boxShadow: "2.5px 5px 5px black",
        padding: "8px",
        width: "300px",
        height: "225px",
        backgroundColor: "#F3E779",
        borderRadius: "4px",
      }}
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
