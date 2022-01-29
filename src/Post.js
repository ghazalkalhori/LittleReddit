import "./Post.css";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Moment from "moment";
import React, { useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

export default function Post({
  community,
  author,
  time,
  title,
  body,
  commentNum,
  likeNum,
  dislikeNum,
  postID,
  communityID,
  isViewerAdmin = false,
}) {
  const [like, SetLikeNum] = useState(likeNum);
  const [dislike, SetDislikeNum] = useState(dislikeNum);
  const [liked, SetLiked] = useState(false);
  const [disliked, SetDisliked] = useState(false);
  const [saved, SetSaved] = useState(false);

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
    var path = "http://localhost:8000/like/p/" + postID + "/?dis=" + action;
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state !== 201) {
      alert(data.message);
    }
  }

  async function fetchDeletePost() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "DELETE",
      headers: { Authorization: token },
    };
    var path = "http://localhost:8000/post/" + postID + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      alert("Post deleted.");
      window.location.reload(true);
    } else {
      alert(data.message);
    }
  }

  function savedPost() {
    if (!saved) fetchSavePost(0);
    else fetchSavePost(1);
    SetSaved(!saved);
  }

  async function fetchSavePost(action) {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "POST",
      headers: { Authorization: token },
    };
    var path = "http://localhost:8000/post/save/" + postID + "/?dis=" + action;
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    alert(data.message);
  }

  return (
    <div class="post">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <ul>
        <div className="header tab">
          <p className="tab">
            <i class="fa fa-reddit-alien"> </i>{" "}
            <Link className="hrefs" to={"/community/" + communityID}>
              {" " + community}
            </Link>
          </p>
          <p className="tab">Posted by: {author}</p>
          <p className="tab">{Moment(time).format("LLL")}</p>
        </div>

        <div className="content">
          <h4 className="tab">
            <Link className="hrefs" to={"/post/" + postID}>
              {title}
            </Link>
          </h4>
          <p className="tab">{body}</p>
        </div>

        <div className="footer">
          <IconButton size="small" onClick={() => incLike()}>
            <ThumbUpOutlinedIcon size="small" className="likebtn" />
            {like}
          </IconButton>


          <IconButton size="small" onClick={() => decLike()}>
            <ThumbDownOutlinedIcon className="dislikebtn" />
            {dislike}
          </IconButton>
          <i class="fa fa-comment-o sp" aria-hidden="true">
            {" " + commentNum}
          </i>

          <IconButton
            size="small"
            className="trash"
            onClick={() => savedPost()}
          >
            <BookmarkAddIcon className="trash" />
          </IconButton>

          {isViewerAdmin ? (
            <IconButton
              size="small"
              className="trash"
              onClick={() => fetchDeletePost()}
            >
              <DeleteIcon className="trash" />
            </IconButton>
          ) : null}
        </div>
      </ul>
    </div>
  );
}
