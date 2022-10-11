import React from "react";
const Header = ({ handleSearch }) => {
  return (
    <>
      <h1>Notes</h1>
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
    </>
  );
};

export default Header;
