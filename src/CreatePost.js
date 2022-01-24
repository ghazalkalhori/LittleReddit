import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreatePost.css";
import Header from "./Header";

export default function CreatePost() {
  // --------------- States
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  // --------------- Handlers

  const postValues = (event) => {
    setPost((lastValue) => {
      return {
        ...lastValue,
        [event.target.name]: event.target.value,
      };
    });

    var bt = document.getElementById("postbtn");
    if (post.title != "" && post.body != "") {
      bt.disabled = false;
    } else {
      bt.disabled = true;
    }
  };

  const clickPost = (e) => {
    e.preventDefault();
    alert("Posted!"); //send to server ???
  };

  // --------------- HTML View
  return (
    <>
     <Header />
      <div className="container-post">
        <div className="card-post">
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
