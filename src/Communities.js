import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Post from "./Post";
import Header from "./Header";

import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CommunityBox from "./CommunityBox";

export default function Communities() {
  const [communityName, SetCommunityName] = useState("");
  const clickOnCreate = () => {
    if (communityName != "") {
      alert("created.");
      // send to server and redirect to community page
      <Link to="/Community" />;
    } else alert("Please enter a value!");
  };

  const sortPosts = (sortParam) => {
    // send sortParam to server and redirect to community page
  };

  return (
    <>
      <Header />
      <div className="table">
        <div className="cms">
          <CommunityBox />
          <CommunityBox />
          <CommunityBox />
        </div>
        <div className="cms">
          <CommunityBox />
          <CommunityBox />
          <CommunityBox />
        </div>
      </div>
    </>
  );
}
