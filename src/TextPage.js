import React from "react";
import PostCard from "./components/SubReddit/PostCard";
import SubInfo from "./components/SubReddit/SubInfo";
import "./styles/PostPage.css";
import { withRouter } from "react-router-dom";
import { redditconn } from "./App";

class TextPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      subredditName: this.props.subreddit,
      idPost: this.props.id
    };
  }

  componentDidMount() {
    redditconn.api
      .get(`/r/${this.state.subredditName}/about`, {})
      .then(data => {
        console.log("Subreddit", data[1].data);
        this.setState({
          desc: data[1].data.public_description,
          icon: data[1].data.community_icon,
          subreddit: data[1].data.title,
          subs: data[1].data.subscribers
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="post-wrapper">
          <div className="column-1">
            <PostCard
              key="test"
              url={`/r/${this.state.subredditName}/comments/${this.state.idPost}/`}
            />
          </div>
          <div className="column-2">
            <SubInfo
              subs={this.state.subs}
              heading="About Community"
              content={this.state.desc}
              icon={this.state.icon}
              subreddit={this.state.subreddit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TextPage);
