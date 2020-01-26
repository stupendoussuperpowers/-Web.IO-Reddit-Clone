import React from "react";
import Navbar from "./components/Navbar";
import Something from "./Something";
import TextPage from "./TextPage";
import "./styles/styles.css";
import * as RedditAPI from "reddit-wrapper-v2";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export const redditconn = RedditAPI({
  username: process.env.REACT_APP_REDDIT_USERNAME,
  password: process.env.REACT_APP_REDDIT_PASSWORD,
  app_id: process.env.REACT_APP_APP_ID,
  api_secret: process.env.REACT_APP_API_SECRET,
  retry_on_wait: true,
  retry_on_server_error: 5,
  retry_delay: 1,
  logs: true
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: ""
    };
  }

  componentDidMount() {
    redditconn.api.get("/r/LifeProTips/about", {}).then(data => {
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
        <Navbar />
        <Router>
          <Switch>
            <Route
              path="/:subreddit"
              exact
              component={props => (
                <Something subreddit={props.match.params.subreddit} />
              )}
            />
            <Route
              path="/r/:subreddit/comments/:id"
              exact
              component={props => (
                <TextPage
                  subreddit={props.match.params.subreddit}
                  id={props.match.params.id}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
