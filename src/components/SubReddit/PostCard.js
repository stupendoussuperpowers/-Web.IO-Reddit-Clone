import React from "react";
import "../../styles/PostPage.css";
import Comment from "../SubReddit/Comment";
import {VoteCounter} from "../VoteCounter"
import * as RedditAPI from 'reddit-wrapper-v2';


export default class PostCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
     id: this.props.id,
     subreddit: this.props.subreddit,
     postData: {},
     commentData: []
    }
  }

  componentDidMount(){
    var redditconn = RedditAPI({
        username: process.env.REACT_APP_REDDIT_USERNAME,
        password: process.env.REACT_APP_REDDIT_PASSWORD,
        app_id : 'ySWZpyWQF46Hxg',
        api_secret: 'hltA3a2ptWLou0XEk6c52CRJFCM',
        retry_on_wait: true,
        retry_on_server_error: 5,
        retry_delay: 1,
        logs: true
    });
    redditconn.api.get('/r/LifeProTips/comments/et2txr',{}).then( data => {
        var postData = data[1][0].data.children[0].data;
        var commentData = data[1][1].data.children;
        console.log("CommentData",commentData);
        this.setState({postData:postData, commentData: commentData, dict: data[1][0].data.children[0].data.selftext, dict2: data[1][1].data.children},
          function(err){
            //console.log(this.state.postData);
          })
        }
    );
}

  render() {
    return (
      
      <div className="card-wrapper">
        <div className = "ltr">
        <div>
          <VoteCounter votes={this.state.postData.score>1000? `${(this.state.postData.score/1000).toFixed(1)}k`: this.state.postData.score} />
          <div className = "verticalLine">
          </div>
        </div>
        <div className = "wrapstuff">
          <small><span className = "bold">{this.state.postData.subreddit_name_prefixed} . </span>
          <span>Posted by u/{this.state.postData.author} X hours ago </span> </small>
          <h3 className = "larger">{this.state.postData.title}</h3>
          <div className = "wrapstuff">{this.state.postData.selftext}</div>
          
          <hr />
          Comments
          <div>
          {
            this.state.commentData.map(function(
              val, ind
            ){
              return (<div>
              <Comment key = {val.data.id} votes = {val.data.score>1000? `${(val.data.score/1000).toFixed(1)}k`: val.data.score} body = {val.data.body} username = {val.data.author} hours = "x" subcomment = {val.data.replies? val.data.replies.data.children:[]} />
              </div>)
            })
          }</div>
      </div>
      </div>
      </div>
    );
  }
}
