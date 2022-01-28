import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./images/logo.png";
import "./Header.css";

import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  // const [darkMode, setDarkMode] = useState(false);

  const clickOnGo = () => {
    if (searchValue !== "") alert("go");
    // send to server
    else alert("Please enter a value!");
  };

  const userSetting = () => {};
  const logOut = () => {
    localStorage.clear();
  };

  // const changeMode = () => {
  //   setDarkMode(!darkMode);
  // };

  return (
    <div class="navbar">
      {/* app logo */}
      <img class="logo" src={Logo} width="50px" height="50px" alt="reddit-logo" />

      {/* app title */}
      <div class="title">
        <Link class="title" to="/home">
          Reddit
        </Link>
      </div>
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
