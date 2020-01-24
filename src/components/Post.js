import React from "react";
import "../styles/styles.css";

export default function Post() {
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
        <p className="Post-user">posted by u/lollipop</p>
        <p className="Post-text">
          This is the Post body. Very interesting Post, wow!
        </p>
        Comments go here
      </div>
    </div>
  );
}
