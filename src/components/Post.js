import React from "react";
import "../styles/styles.css";

export default function Post(props) {
  return (
    <div className="Post">
      <div className="votes">
        <img
          className="upvote"
          alt="upvote"
          src="https://image.flaticon.com/icons/svg/2316/2316622.svg"
        />
        <p>5</p>
        <img
          className="downvote"
          alt="downvote"
          src="https://image.flaticon.com/icons/svg/2316/2316643.svg"
        />
      </div>
      <div className="Post-right">
        <div className="Post-user">posted by {props.author}</div>
        <div className="Post-text">{props.title}</div>
      </div>
    </div>
  );
}
