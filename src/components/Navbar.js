import React from "react";
import "../styles/styles.css";
import redditlogo from './Reddit_logo.png';

export default function Navbar() {
  return (
    <div className="NavBar">
      <h1 id="heading">
        <img src={redditlogo} alt = "redditlogo"/>
      </h1>
      <input type="text" className="SearchBar" placeholder="Search Reddit" />
    </div>
  );
}
