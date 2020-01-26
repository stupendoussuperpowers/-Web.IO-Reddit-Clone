import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { redditconn } from "./App";
import Post from "./components/Post";

class Something extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      subreddit: this.props.subreddit
    };
  }

  componentDidMount() {
    redditconn.api.get(`/r/${this.state.subreddit}/best`, {}).then(data => {
      console.log(data[1].data.children);
      this.setState({ posts: data[1].data.children });
    });
  }

  render() {
    return (
      <div className="SubReddit">
        <h2 className="post-head">Posts</h2>
        <div className="main-wrapper">
          <div className="Post-List">
            {this.state.posts.map(function(val, ind) {
              return (
                <div>
                  <Post title={val.data.title} author={val.data.author} />
                </div>
              );
            })}

            <Post content="jon snow" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Something);
