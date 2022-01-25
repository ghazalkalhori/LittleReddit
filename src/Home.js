import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Post from "./Post";
import Header from "./Header";

import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

export default function Home() {
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

  function ShowPosts(item) {
    return (
      <Post
        community ={item?.community}
        author={item?.author}
        time={item?.time}
        title={item?.title}
        body={item?.body}
        commentNum={item?.commentNum}
        likeNum={item?.likeNum}        
      />
    );
  }

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

        <div class="rightbar">
          {/* trends box */}
          <div class="column trend">
            <h3>TOP COMMUNITIES</h3>
            <ul>
              <li>ONE</li>
              <li>TWO</li>
              <li>THREE</li>
              <li>FOUR</li>
              <li>FIVE</li>
            </ul>
  
            <button className="viewBtn">
              <Link  className="viewBtn" to="/communities">
              VIEW ALL
              </Link>
            </button>

          </div>

          {/* creation box */}
          <div class="column create">
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <form onSubmit={clickOnCreate}>
              <input
                type="text"
                placeholder="Comunity Name"
                value={communityName}
                onChange={(e) => SetCommunityName(e.target.value)}
                className="cm"
              />
              <button type="submit" className="createBtn">
                <i class="fa fa-user-plus"></i>
                CREATE
              </button>            
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
