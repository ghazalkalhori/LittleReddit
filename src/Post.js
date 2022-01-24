import "./Post.css";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useState } from "react";

export default function Post({
  community = "game2048",
  author = "ghazal",
  time = "2022.01.01",
  title = "CSGO",
  body = "Counter-Strike: Global Offensive is a multiplayer first-person shooter developed by Valve and Hidden Path Entertainment. It is the fourth game in the Counter-Strike series. Developed for over two years, Global Offensive was released for Windows, macOS, Xbox 360, and PlayStation 3 in August 2012, and for Linux in 2014.",
  commentNum = 10,
  likeNum = 5,
}) {
  var likeNumIn = likeNum;
  const LikeCount = (act) => {
    if (act === "+") likeNumIn = likeNumIn + 1;
    else likeNumIn = likeNumIn - 1;
  };

  return (
    <div class="post">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <ul>
        <div className="header tab">
          <p className="tab">
            <i class="fa fa-reddit-alien"> </i> {" " + community}
          </p>
          <p className="tab">Posted by: {author}</p>
          <p className="tab">{time}</p>
        </div>

        <div className="content">
          <h4 className="tab">{title}</h4>
          <p className="tab">{body}</p>
        </div>

        <div className="footer">
          <IconButton onClick={LikeCount("+")}>
            <ThumbUpOutlinedIcon />
          </IconButton>
          <a>{likeNumIn}</a>
          <IconButton onClick={LikeCount("-")}>
            <ThumbDownOutlinedIcon />
          </IconButton>
          <a className="tab">
            <i class="fa fa-comment-o" aria-hidden="true"></i>
            {" " + commentNum}
          </a>
        </div>
      </ul>
    </div>
  );
}
