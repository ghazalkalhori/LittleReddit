import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./images/logo.png";
import "./Header.css";

import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [people, setPeople] = useState(false);
  const [searchCommunities, setSearchCommunities] = useState(false);
  const [posts, setPosts] = useState(false);

  const clickOnGo = () => {
    if (searchValue != "") alert("go");
    // send to server
    else alert("Please enter a value!");
  };
  const userSetting = () => {};
  const logOut = () => {
    localStorage.removeItem("token");
  };

  const changeMode = () => {
    setDarkMode(!darkMode);
  };
  const changeStatusPosts = () => {
    setPosts(!posts);
  };
  const changeStatusCommunities = () => {
    setSearchCommunities(!searchCommunities);
  };
  const changeStatusPeople = () => {
    setPeople(!people);
  };

  return (
    <div class="navbar">
      {/* app logo */}
      <a>
        <img class="logo" src={Logo} width="50px" height="50px" />
      </a>
      {/* app title */}
      <a class="title">
        <Link class="title" to="/home">
          Reddit
        </Link>
      </a>
      <div className="searchBox">
        {/* search box */}
        <input
          class="search"
          type="text"
          value={searchValue}
          placeholder="Search Reddit"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {/* go button */}
        <button class="go" onClick={clickOnGo}>
          GO
        </button>
        {/* radio buttos */}
        <ul class="radio">
          <IconButton onClick={changeStatusPeople}>
            {people ? <PeopleRoundedIcon /> : <PeopleOutlineIcon />}
          </IconButton>
          <IconButton onClick={changeStatusCommunities}>
            {searchCommunities ? <ForumIcon /> : <ForumOutlinedIcon />}
          </IconButton>
          <IconButton onClick={changeStatusPosts}>
            {posts ? <LocalPostOfficeIcon /> : <LocalPostOfficeOutlinedIcon />}
          </IconButton>
        </ul>
      </div>
      <div class="navbar-right">
        {/* user setting */}
        <IconButton onClick={userSetting}>
          <Link className="setting" to="/setting">
            <SettingsIcon />
          </Link>
        </IconButton>

        {/* dark mode
        <IconButton onClick={changeMode}>
          {darkMode ? <DarkModeIcon /> : <WbSunnyOutlinedIcon />}
        </IconButton> */}

        {/* logout */}
        <IconButton onClick={logOut}>
          <Link className="setting" to="/">
            <LogoutIcon />
          </Link>
        </IconButton>
      </div>
    </div>
  );
}
