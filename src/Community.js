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
  const [enterCm, SetEnterCm] = useState(true);
  const [communityName, SetCommunityName] = useState("");
  const [communityInfo, SetCommunityInfo] = useState("");
  const [notJoined, SetJoined] = useState(true);
  const [posts, SetPosts] = useState([]);
  const [admin, SetAdmin] = useState(false);

  const sortPosts = (sortParam) => {
    // send sortParam to server and redirect to community page
  };

  const membership = () => {
    SetJoined(!notJoined);
    if (notJoined) {
      fetchjoinCm();
    }
    // add else
  };

  async function fetchjoinCm() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: {},
    };

    var path =
      "http://localhost:8000/member/" + localStorage.getItem("currID") + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 201) {
      alert("Membership completed successfully.");
    } else {
      alert(data.name);
    }
  }

  async function fecthCommunity() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    var path =
      "http://localhost:8000/cm/" + localStorage.getItem("currID") + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetCommunityName(data.cm_name);
      SetCommunityInfo(data.cm_desc);
      SetAdmin(data.is_admin);
      SetPosts(data.results);
    } else {
      alert(data.message);
    }
  }

  function ShowPosts(item) {
    return (
      <Post
        community={communityName}
        author={item?.user__username}
        time={item?.created}
        title={item?.title}
        body={item?.text}
        commentNum={item?.comments_count}
        likeNum={item?.likes_count - item?.dislikes_count}
      />
    );
  }

  // fetch whenever refreshes
  if (enterCm) {
    fecthCommunity();
    SetEnterCm(false);
  }

  return (
    <div className="allPage">
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
          {posts.map((item) => ShowPosts(item))}
        </div>

        <div className="rightbar">
          <div className="column-cm cmBox">
            <h3 className="cmName">
              <RedditIcon /> {communityName}
            </h3>
            <h4 className="cmHdr">About Community</h4>
            <p className="cmAbout">{communityInfo}</p>
            <IconButton onClick={membership}>
              {notJoined ? <HowToRegOutlinedIcon /> : <HowToRegIcon />} Membership
            </IconButton>
            <button className="createPost">
              <Link className="createPost" to="/createPost">
                Create Post
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
