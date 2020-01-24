import React, { Component } from "react";
import "../../styles/PostPage.css";

export class SubInfo extends Component {

  render() {
    return (
      <div className="sub-info">
        <h4>{this.props.heading}</h4>
        {
        this.props.icon?
        <div id = "moveUp">
        <img src = {this.props.icon}  height = "50px" alt = "Logo" />
        {this.props.subreddit}
        </div>:<div>{this.props.subreddit}</div>
        }
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default SubInfo;
