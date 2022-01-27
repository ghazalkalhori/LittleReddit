import "./Post.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Post from "./Post";
import Comment from "./Comment";
import Header from "./Header";

export default function PostDetail() {
  let navigate = useNavigate();
  const [enteredPost, SetEnteredPost] = useState(true);

  const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);
  var postID = getLastItem(window.location.href);

  const [comments, SetComments] = useState([]);
  const [commentText, SetCommentText] = useState("");

  async function fetchSendComment() {
    var res;
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        post_id: postID,
        text: commentText,
      }),
    };

    const response = await fetch("http://localhost:8000/comment/", info);
    const state = response.status;
    const data = await response.json();

    if (state === 201) {
      alert("Comment created successfully.");
      res = true;
    } else {
      alert(data.message);
      res = false;
    }
    return res;
  }

  async function fetchShowComments() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    var path = "http://localhost:8000/comment/" + postID + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetComments(data.results);
    } else {
      alert(data.message);
    }
  }

  function clickOnCommment(event) {
    event.preventDefault();
    if (commentText !== "") {
      var res = fetchSendComment();
      if (res) fetchShowComments();
    } else alert("Please fill comment box.");
  }

  function ShowComments(item) {
    return (
      <Comment
        author={item?.user__username}
        time={item?.created}
        text={item?.text}
        likeNum={item?.total_likes}
        comID={item?.id}
      />
    );
  }

  // fetch whenever refreshes
  if (enteredPost) {
    fetchShowComments();
    SetEnteredPost(false);
  }

  return (
    <>
      <Header />
      <div className="postDetail">
        <Post />
        <div class="column create">
          <form onSubmit={clickOnCommment}>
            <textarea
              className="body-cm"
              placeholder="What are your thoughts?"
              rows="4"
              cols="50"
              value={commentText}
              onChange={(e) => SetCommentText(e.target.value)}
            />
            <button type="submit" className="createBtn">
              <i class="fa fa-user-plus"></i>
              COMMENT
            </button>
          </form>
        </div>
        {comments.map((item) => ShowComments(item))}
      </div>
    </>
  );
}
