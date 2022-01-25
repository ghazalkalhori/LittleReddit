import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Community.css";

import IconButton from "@material-ui/core/IconButton";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RedditIcon from "@mui/icons-material/Reddit";

export default function CommunityBox() {
  var communityName = "Community Name";
  const [joined, SetJoined] = useState(false);

  const membership = () => {
    SetJoined(!joined);
    // send data to server
  };

  return (
    <>
      <div className="column-cm cmBox">
        <h3 className="cmName">
          <RedditIcon /> {communityName}
        </h3>

        <h4 className="cmHdr">About Community</h4>
        <p className="cmAbout">
          A Reddit community for all things Last.fm and scrobbling! Discuss the
          latest features, discover cool Last.fm tools and utilities, share your
          taste, celebrate scrobble milestones and more.
        </p>

        <IconButton onClick={membership}>
          {joined ? <HowToRegIcon /> : <HowToRegOutlinedIcon />} Membership
        </IconButton>
      </div>
    </>
  );
}
