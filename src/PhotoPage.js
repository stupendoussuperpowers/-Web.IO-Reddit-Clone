import React from "react";
import Navbar from "./components/Navbar";
import PostCard from "./components/SubReddit/PostCard";
import SubInfo from "./components/SubReddit/SubInfo";
import "./styles/styles.css";
import * as RedditAPI from 'reddit-wrapper-v2';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export const redditconn = RedditAPI({
  username: process.env.REACT_APP_REDDIT_USERNAME,
  password: process.env.REACT_APP_REDDIT_PASSWORD,
  app_id : process.env.REACT_APP_APP_ID,
  api_secret: process.env.REACT_APP_API_SECRET,
  retry_on_wait: true,
  retry_on_server_error: 5,
  retry_delay: 1,
  logs: true
});


export default class  PhotoPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      desc: ""
    };
  }

  componentDidMount(){
    redditconn.api.get('/r/LifeProTips/about', {}).then( data => {
      console.log("Subreddit", data[1].data);
      this.setState({desc: data[1].data.public_description, 
        icon : data[1].data.community_icon, 
        subreddit: data[1].data.title,
      subs: data[1].data.subscribers });
    })

  }

  render(){
    return (
      <div className="App">
        <div className="post-wrapper">
          <div className="column-1">
            <PostCard key = "test" url = "/r/funny/comments/ethqk6/" />
          </div>
          <div className="column-2">
            <SubInfo subs = {this.state.subs} heading = "About Community" content = {this.state.desc} icon = {this.state.icon} subreddit = {this.state.subreddit}/>
          </div>
        </div>
      </div>
    );
  }
}
