import React, { Component } from "react";
import "../../styles/PostPage.css";

export class SubInfo extends Component {

  numberToWord(val){
    var suffix = '';
    if(val>1000){
      val = (val/1000).toFixed(1);
      suffix = 'k';
    }
    if(val>1000){
      val = (val/1000).toFixed(1);
      suffix = 'M';
    }

    return val+suffix;
  }

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
        <div>{this.numberToWord(this.props.subs)}</div>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default SubInfo;
