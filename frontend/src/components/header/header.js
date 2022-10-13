import React, { useState } from "react";
import NoteModal from "../modal/modal";
import AddIcon from "@mui/icons-material/Add";
import styles from "./header.module.scss";

const Header = ({ handleSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.headerContainer}>
        <h1>Notes</h1>
        <button
          className={styles.addNote}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <AddIcon fontSize="large" />
        </button>
      </div>
      <span>
        <input
          className={styles.searchBox}
          type="text"
          id="searchBar"
          placeholder="Search for Notes"
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
