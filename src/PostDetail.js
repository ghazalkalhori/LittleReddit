import "./Post.css";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useState, Link } from "react";

export default function PostDetail({    // change 
  community,
  author,
  time ,
  title ,
  body,
  commentNum,
  likeNum,
  postID,
  communityID
}) {
  var likeNumIn = likeNum;
  const LikeCount = (act) => {
    if (act === "+") likeNumIn = likeNumIn + 1;
    else likeNumIn = likeNumIn - 1;
    // send to server
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
