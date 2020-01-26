import React from "react";
import "../../styles/PostPage.css";
import Comment from "../SubReddit/Comment";
import { VoteCounter } from "../VoteCounter";
import { redditconn } from "../../App";
import ReactHtmlParser from "react-html-parser";

export default class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      subreddit: this.props.subreddit,
      postData: {},
      commentData: [],
      subredditData: {}
    };
  }

  componentDidMount() {
    redditconn.api.get(this.props.url, {}).then(data => {
      var postData = data[1][0].data.children[0].data;
      var commentData = data[1][1].data.children;
      console.log("PostData", postData);
      console.log("Preview", postData.preview);
      this.setState({
        postData: postData,
        commentData: commentData,
        dict: data[1][0].data.children[0].data.selftext,
        dict2: data[1][1].data.children
      });
    });
  }

  render() {
    return (
      <div className="card-wrapper">
        <div className="ltr">
          <div>
            <VoteCounter
              votes={
                this.state.postData.score > 1000
                  ? `${(this.state.postData.score / 1000).toFixed(1)}k`
                  : this.state.postData.score
              }
            />
          </div>

          <div className="wrap">
            <small>
              <span className="bold">
                {this.state.postData.subreddit_name_prefixed} .{" "}
              </span>
              <span>Posted by u/{this.state.postData.author} X hours ago </span>{" "}
            </small>
            <div className="larger">{this.state.postData.title}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: ReactHtmlParser(this.state.postData.selftext_html)
              }}
            />
            {this.state.postData.post_hint === "image" ? (
              <div className="post-image">
                <img
                  src={this.state.postData.url}
                  alt="thumbnail"
                  width="200px"
                />
              </div>
            ) : (
              <div></div>
            )}
            <hr />
            Comments
            <div>
              {this.state.commentData.map(function(val, ind) {
                return (
                  <div>
                    <Comment
                      key={val.data.id}
                      votes={
                        val.data.score > 1000
                          ? `${(val.data.score / 1000).toFixed(1)}k`
                          : val.data.score
                      }
                      body={val.data.body_html}
                      username={val.data.author}
                      hours="x"
                      subcomment={
                        val.data.replies ? val.data.replies.data.children : []
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
