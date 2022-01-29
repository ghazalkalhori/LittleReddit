import React, { useState } from "react";
import Post from "./Post";
import "./SearchResult.css";
import Header from "./Header";
import "./Header.css";
import "./SearchResult.css";
import "./Community.css";

export default function SavedPosts() {
  const [enteredSaved, SetEnteredSaved] = useState(true);
  const [posts, SetPosts] = useState([]);

  async function fetchSavedPosts() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    const response = await fetch("http://localhost:8000/post/save/", info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetPosts(data.results);
    } else {
      alert(data.message);
    }
  }

  function ShowPosts(item) {
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

  if (enteredSaved) {
    fetchSavedPosts();
    SetEnteredSaved(false);
  }

  return (
    <>
      <Header />
      <div className="column-sr left saved">
        <div className="sr">
          <i class="fa fa-envelope sr" aria-hidden="true"></i>
          SAVED POSTS
        </div>
        {posts.map((item) => ShowPosts(item))}
      </div>
    </>
  );
}
