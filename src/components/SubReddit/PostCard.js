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
     commentData: [],
     subredditData: {}
    }
  }

  componentDidMount(){
    var redditconn = RedditAPI({
        username: process.env.REACT_APP_REDDIT_USERNAME,
        password: process.env.REACT_APP_REDDIT_PASSWORD,
        app_id : process.env.REACT_APP_APP_ID,
        api_secret: process.env.REACT_APP_API_SECRET,
        retry_on_wait: true,
        retry_on_server_error: 5,
        retry_delay: 1,
        logs: true
    });

    redditconn.api.get('/r/LifeProTips/comments/et2txr',{}).then( data => {
        var postData = data[1][0].data.children[0].data;
        var commentData = data[1][1].data.children;
        console.log("CommentData",commentData);
        this.setState({postData:postData, commentData: commentData, dict: data[1][0].data.children[0].data.selftext, dict2: data[1][1].data.children})
        }
    );
    
    redditconn.api.get('/r/LifeProTips/about', {}).then( data => {
      console.log("Subreddit", data);
    })

}

  render() {
    return (
      
      <div className="card-wrapper">
        <div className = "ltr">
        
        <div>
          <VoteCounter votes={this.state.postData.score>1000? `${(this.state.postData.score/1000).toFixed(1)}k`: this.state.postData.score} />
        </div>

        <div className = "wrap">
          <small><span className = "bold">{this.state.postData.subreddit_name_prefixed} . </span>
          <span>Posted by u/{this.state.postData.author} X hours ago </span> </small>
          <div className = "larger">{this.state.postData.title}</div>
          <div className = "wrap">{this.state.postData.selftext}</div>
          
          <hr />
          Comments
          <div>
          {
            this.state.commentData.map(function(val, ind){
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
