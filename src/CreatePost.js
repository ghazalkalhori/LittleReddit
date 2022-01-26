import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreatePost.css";
import Header from "./Header";

export default function CreatePost() {
  let navigate = useNavigate();
  const [post, setPost] = useState({
    community: localStorage.getItem("currCm"),
    title: "",
    body: "",
  });

  const postValues = (event) => {
    setPost((lastValue) => {
      return {
        ...lastValue,
        [event.target.name]: event.target.value,
      };
    });

    var bt = document.getElementById("postbtn");
    if (post.title !== "" && post.body !== "") {
      bt.disabled = false;
    } else {
      bt.disabled = true;
    }
  };

  async function fetchCreatePost() {
    var res;
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        title: post.title,
        text: post.body,
        community_id: localStorage.getItem("currID"),
      }),
    };

    const response = await fetch("http://localhost:8000/post/", info);
    const state = response.status;
    const data = await response.json();

    if (state === 201) {
      alert("Post created successfully.");
      res = true;
    } else {
      alert(data.title); // change it?
      res = false;
    }
    return res;
  }

  function clickPost(event) {
    event.preventDefault();
    if (post.title !== "" && post.body !== "") {
      var worked = fetchCreatePost();
      if (worked) {
        var path = "/community/" + post.community;
        navigate(path, { replace: true });
      }
    } else alert("Both fields must be filled!");
  }

  return (
    <>
      <Header />
      <div className="container-post">
        <div className="card-post">
          <p>{post.community}</p>
          <form onSubmit={clickPost}>
            <input
              className="title-post"
              name="title"
              type="text"
              placeholder="Title"
              value={post.title}
              onChange={postValues}
            />
            <textarea
              className="body-post"
              name="body"
              placeholder="Text"
              rows="4"
              cols="50"
              value={post.body}
              onChange={postValues}
            />
            <button
              className="buttons-post"
              type="submit"
              id="postbtn"
              disabled="true"
            >
              POST
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
