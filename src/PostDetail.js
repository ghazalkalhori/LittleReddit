import "./Post.css";
import React, { useState } from "react";
import Post from "./Post";
import Comment from "./Comment";
import Header from "./Header";

export default function PostDetail() {
  const [enteredPost, SetEnteredPost] = useState(true);
  const [comments, SetComments] = useState([]);
  const [commentText, SetCommentText] = useState("");
  const [post, SetPost] = useState([]);

  const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);
  var postID = getLastItem(window.location.href);

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
      window.location.reload(true);
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

  async function fetchShowPost() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    var path = "http://localhost:8000/post/" + postID + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetPost(data.results);
    } else {
      alert(data.message);
    }
  }

  function clickOnCommment(event) {
    event.preventDefault();
    if (commentText !== "") fetchSendComment();
    else alert("Please fill comment box.");
  }

  function ShowComments(item) {
    return (
      <Comment
        author={item?.user__username}
        time={item?.created}
        text={item?.text}
        likeNum={item?.likes_count}
        dislikeNum={item?.dislikes_count}
        comID={item?.id}
      />
    );
  }

  function ShowPost(item) {
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

  if (enteredPost) {
    fetchShowPost();
    fetchShowComments();
    SetEnteredPost(false);
  }

  return (
    <>
      <Header />
      <div className="allcont">
        <div className="leftbar">
          {post.map((item) => ShowPost(item))}
          {comments.map((item) => ShowComments(item))}
        </div>
        <div className="rightbar">
          <div class="column create lcom">
            <form onSubmit={clickOnCommment}>
              <textarea
                className="body-cm"
                placeholder="What are your thoughts?"
                rows="4"
                cols="30"
                value={commentText}
                onChange={(e) => SetCommentText(e.target.value)}
              />
              <button type="submit" className="createBtn bcom">
                <i class="fa fa-user-plus"></i>
                COMMENT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
