import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "./images/logo.png";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function Header() {
  let navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const clickOnGo = () => {
    if (searchValue !== "") {
      var path = "/search/" + searchValue;
      navigate(path);
    } else alert("Please enter a value!");
  };

  const logOut = () => {
    localStorage.clear();
  };

  return (
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
  );
}
