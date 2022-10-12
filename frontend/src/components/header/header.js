import React, { useState } from "react";
import NoteModal from "../modal/modal";

const Header = ({ handleSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Notes</h1>
        <button
          style={{ background: "blue", width: "64px", height: "40px" }}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Note
        </button>
      </div>
      <span>
        <input
          style={{
            width: "100%",
            height: "32px",
            border: "0px solid white",
          }}
          type="text"
          id="searchBar"
          placeholder="Search Notes"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </span>
      <NoteModal
        id={new Date().getTime()}
        note={""}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        isNew={true}
      />
    </>
  );
};

export default Header;
