import React from "react";
import '../styles/styles.css'

export const VoteCounter = (props) => {
  return (
    <div className="votes">
        <img
          className="upvote"
          alt="upvote"
          src="https://image.flaticon.com/icons/svg/2316/2316622.svg"
        />
        <p className = "score">{props.votes}</p>
        <img
          className="downvote"
          alt="downvote"
          src="https://image.flaticon.com/icons/svg/2316/2316643.svg"
        />
      </div>
  );
};
