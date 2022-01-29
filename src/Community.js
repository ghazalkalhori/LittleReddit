import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Community.css";
import "./Home.css";
import Post from "./Post";
import Header from "./Header";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import RedditIcon from "@mui/icons-material/Reddit";
import EditIcon from "@mui/icons-material/Edit";

export default function Community() {
  const [enteredCm, SetEnteredCm] = useState(true);
  const [communityName, SetCommunityName] = useState("");
  const [communityInfo, SetCommunityInfo] = useState("");
  const [posts, SetPosts] = useState([]);
  const [isMember, SetMember] = useState(false);
  const [isAdmin, SetAdmin] = useState(false);
  const [newAdmin, SetNewAdmin] = useState("");

  const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);
  var cmID = getLastItem(window.location.href);

  const membership = () => {
    if (!isMember) fetchjoinCm(0);
    else if (isMember) fetchjoinCm(1);
  };

  async function fetchjoinCm(action) {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: {},
    };

    var path = "http://localhost:8000/member/" + cmID + "/?decline=" + action;
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 201) {
      if (action === 0) {
        alert("Membership completed.");
      } else {
        alert("Membership canceled.");
      }
      fecthCommunity();
    } else {
      alert(data.message);
    }
  }

  async function fecthCommunity() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    var path = "http://localhost:8000/cm/" + cmID + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetPosts(data.results);
      SetCommunityName(data.cm_name);
      SetCommunityInfo(data.cm_desc);
      SetAdmin(data.is_admin);
      SetMember(data.is_member || data.is_admin);
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
        likeNum={item?.likes_count}
        dislikeNum={item?.dislikes_count}
        communityID={cmID}
        postID={item?.id}
        isViewerAdmin={isAdmin}
      />
    );
  }

  async function fetchNewAdmin() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        community_id: cmID,
        username: newAdmin,
      }),
    };

    const response = await fetch("http://localhost:8000/admins", info);
    const state = response.status;
    const data = await response.json();
    alert(data.message);
  }

  function makeAdmin() {
    if (newAdmin !== "") fetchNewAdmin();
    else alert("Please enter the username!");
  }

  if (enteredCm) {
    fecthCommunity();
    SetEnteredCm(false);
  }

  return (
    <div className="allPage">
      <Header />
      <div className="allcont">
        {/* posts and sorting */}
        <div className="leftbar">{posts.map((item) => ShowPosts(item))}</div>
        <div className="rightbar">
          <div className="column-cm cmBox">
            <h3 className="cmName">
              <RedditIcon /> {communityName}
              {isAdmin ? (
                <button className="editcm">
                  <Link className="editcm" to={"/edit/" + cmID}>
                    <EditIcon />
                  </Link>
                </button>
              ) : null}
            </h3>
            <h4 className="cmHdr">About Community</h4>
            <p className="cmAbout">{communityInfo}</p>
            {isAdmin ? null : (
              <button
                className={` ${isMember ? "joined" : "membership"}`}
                onClick={membership}
              >
                <HowToRegOutlinedIcon /> Membership
              </button>
            )}
            {isMember ? (
              <button className="createPost">
                <Link className="createPost" to={"/createPost/" + cmID}>
                  Create Post
                </Link>
              </button>
            ) : null}
          </div>
          {!isAdmin ? null : (
            <div class="column create newadmin">
              <form onSubmit={makeAdmin}>
                <input
                  className="cm ad-txt"
                  type="text"
                  placeholder="USERNAME"
                  value={newAdmin}
                  onChange={(e) => SetNewAdmin(e.target.value)}
                />
                <button type="submit" className="ad-btn">
                  <i class="fa fa-user-plus"></i>
                  MAKE ADMIN
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
