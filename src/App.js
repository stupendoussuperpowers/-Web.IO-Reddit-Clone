import React from "react";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import PostCard from "./components/SubReddit/PostCard";
import SubInfo from "./components/SubReddit/SubInfo";
import "./styles/styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <div className="Post-List">
        <Post />
        <Post />
        <Post />
        <Post />
      </div> */}

      <div className="post-wrapper">
        <div className="column-1">
          <PostCard key = "test"/>
        </div>

        <div className="column-2">
          <SubInfo />
          <SubInfo />
        </div>
      </div>
    </div>
  );
}
