import IconButton from "@material-ui/core/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import "./Post.css";
import Moment from "moment";
import React, { useState } from "react";

export default function Comment({
  author,
  time,
  text,
  likeNum,
  dislikeNum,
  comID,
}) {
  const [like, SetLikeNum] = useState(likeNum);
  const [dislike, SetDislikeNum] = useState(dislikeNum);
  const [liked, SetLiked] = useState(false);
  const [disliked, SetDisliked] = useState(false);

  function incLike() {
    if (!liked) {
      SetLiked(true);
      SetLikeNum(like + 1);
      SetDisliked(false);
      if (disliked) SetDislikeNum(dislike - 1);
      fetchLike(0);
    }
  }

  function decLike() {
    if (!disliked) {
      SetDisliked(true);
      SetDislikeNum(dislike + 1);
      SetLiked(false);
      if (liked) SetLikeNum(like - 1);
      fetchLike(1);
    }
  }

  async function fetchLike(action) {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "POST",
      headers: { Authorization: token },
    };
    var path = "http://localhost:8000/like/c/" + comID + "/?dis=" + action;
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state !== 201) {
      alert(data.message);
    }
  }

  return (
    <ul className="com-box">
      <div className="header-com tab">
        <p className="tab">{author}</p>
        <p className="tab">{Moment(time).format("LLL")}</p>
      </div>

      <div className="content-com">
        <p className="tab">{text}</p>
      </div>

      <div className="content-com">
        <IconButton size="small" onClick={() => incLike()}>
          <ThumbUpOutlinedIcon size="small" className="likebtn" />
          {like}
        </IconButton>

        <IconButton size="small" onClick={() => decLike()}>
          <ThumbDownOutlinedIcon className="dislikebtn" />
          {dislike}
        </IconButton>
      </div>
    </ul>
  );
}
