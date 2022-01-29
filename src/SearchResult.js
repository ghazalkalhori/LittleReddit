import React, { useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import "./SearchResult.css";
import "./Community.css";
import Logo from "./images/logo.png";
import RedditIcon from "@mui/icons-material/Reddit";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function SearchResult() {
  let navigate = useNavigate();
  const [enteredSearch, SetEnteredSearch] = useState(true);
  const [posts, SetPosts] = useState([]);
  const [users, SetUsers] = useState([]);
  const [communities, SetCommunities] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);
  var searchId = getLastItem(window.location.href);

  const clickOnGo = () => {
    if (searchValue !== "") {
      var path = "/search/" + searchValue;
      navigate(path);
      SetEnteredSearch(true);
    } else alert("Please enter a value!");
  };

  const logOut = () => {
    localStorage.clear();
  };

  async function fetchSearchPost() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    var path = "http://localhost:8000/search/p/" + searchId + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetPosts(data.results);
    } else {
      alert(data.message);
    }
  }

  async function fetchSearchUser() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    var path = "http://localhost:8000/search/u/" + searchId + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetUsers(data.results);
    } else {
      alert(data.message);
    }
  }

  async function fetchSearchCommunity() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    var path = "http://localhost:8000/search/c/" + searchId + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetCommunities(data.results);
    } else {
      alert(data.message);
    }
  }

  function ShowPosts(item) {
    return (
      <Post
        community={item?.community__name}
        author={item?.user__username}
        time={item?.created}
        title={item?.title}
        body={item?.text}
        commentNum={item?.comments_count}
        likeNum={item?.likes_count}
        dislikeNum={item?.dislikes_count}
        communityID={item?.community__id}
        postID={item?.id}
      />
    );
  }

  function ShowCommunities(item) {
    return (
      <div className="column-cm cmBox">
        <h3 className="cmName">
          <RedditIcon />
          <Link className="ref" to={"/community/" + item?.id}>
            {item?.name}
          </Link>
        </h3>
        <h4 className="cmHdr">About Community</h4>
        <p className="cmAbout">{item?.descriptions}</p>
      </div>
    );
  }

  function ShowUsers(item) {
    return <li>{item?.username}</li>;
  }

  if (enteredSearch) {
    fetchSearchPost();
    fetchSearchUser();
    fetchSearchCommunity();
    SetEnteredSearch(false);
  }

  return (
    <>
      <div class="navbar">
        <img
          class="logo"
          src={Logo}
          width="50px"
          height="50px"
          alt="reddit-logo"
        />
        <div class="title">
          <Link class="title" to="/home">
            Reddit
          </Link>
        </div>
        <div className="searchBox">
          <input
            class="search"
            type="text"
            value={searchValue}
            placeholder="Search Reddit"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button class="go" onClick={clickOnGo}>
            GO
          </button>
        </div>
        <div class="navbar-right">
          <IconButton>
            <Link className="setting" to="/saved">
              <BookmarkIcon />
            </Link>
          </IconButton>
          <IconButton>
            <Link className="setting" to="/setting">
              <SettingsIcon />
            </Link>
          </IconButton>
          <IconButton onClick={logOut}>
            <Link className="setting" to="/">
              <LogoutIcon />
            </Link>
          </IconButton>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="row-sr">
        <div className="column-sr left">
          <div class="fa fa-envelope sr" aria-hidden="true">
            {" "}
            POSTS
          </div>
          {posts.map((item) => ShowPosts(item))}
        </div>
        <div className="column-sr mid">
          <i class="fa fa-users sr" aria-hidden="true">
            {" "}
            COMMUNITIES
          </i>
          {communities.map((item) => ShowCommunities(item))}
        </div>
        <div className="column-sr right">
          <i class="fa fa-user-circle-o sr" aria-hidden="true">
            {" "}
            USERS
          </i>
          {users.map((item) => ShowUsers(item))}
        </div>
      </div>
    </>
  );
}
