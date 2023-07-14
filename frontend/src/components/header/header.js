import React, { useState } from "react";
import NoteModal from "../modal/modal";
import AddIcon from "@mui/icons-material/Add";
import styles from "./header.module.scss";
import logo from "../../../public/svg/logo-no-background.svg";
import { setLogout } from "../../redux/user/reducer";
import { useDispatch } from "react-redux";
const Header = ({ handleSearch }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.headerContainer}>
        <img
          style={{ height: "40px", width: "50px" }}
          src={logo}
          alt="header-logo"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              margin: "4px",
              padding: "0.25rem",
              backgroundColor: "maroon",
              color: "white",
              borderRadius: "4px",
              border: "2px solid black",
            }}
            onClick={() => {
              alert("Logging Out...");
              dispatch(setLogout(false));
            }}
          >
            Logout
          </button>
          <button
            className={styles.addNote}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <AddIcon fontSize="large" />
          </button>
        </div>
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
        noteId={""}
        note={""}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        isNew={true}
      />
    </>
  );
};

export default Header;
