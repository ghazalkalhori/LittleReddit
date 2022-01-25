import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Community.css";
import "./Home.css";
import Post from "./Post";
import Header from "./Header";

import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RedditIcon from "@mui/icons-material/Reddit";

export default function Community() {
  var communityName = "Community Name";
  const [joined, SetJoined] = useState(false);

  const sortPosts = (sortParam) => {
    // send sortParam to server and redirect to community page
  };

  const membership = () => {
    SetJoined(!joined);
    // send data to server
  };

  return (
    <>
      <Header />

      <div className="allcont">
        {/* posts and sorting */}
        <div className="leftbar">
          <div class="sortbar">
            SORT BY:
            <IconButton onClick={sortPosts("time")}>
              <AccessTimeIcon className="ic" />
            </IconButton>
            <IconButton onClick={sortPosts("like")}>
              <FavoriteBorderOutlinedIcon className="ic" />
            </IconButton>
            <IconButton onClick={sortPosts("comment")}>
              <ChatBubbleOutlineOutlinedIcon className="ic" />
            </IconButton>
          </div>
          <Post />
          <Post />
          <Post />
        </div>

        <div className="rightbar">
          <div className="column-cm cmBox">
            <h3 className="cmName">
              <RedditIcon /> {communityName}
            </h3>

            <h4 className="cmHdr">About Community</h4>
            <p className="cmAbout">
              A Reddit community for all things Last.fm and scrobbling! Discuss
              the latest features, discover cool Last.fm tools and utilities,
              share your taste, celebrate scrobble milestones and more.
            </p>

            <IconButton onClick={membership}>
              {joined ? <HowToRegIcon /> : <HowToRegOutlinedIcon />} Membership
            </IconButton>
            <button className="createPost">
              <Link className="createPost" to="/createPost">
                Create Post
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
