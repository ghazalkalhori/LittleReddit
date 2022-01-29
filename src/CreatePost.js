import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import Header from "./Header";

export default function CreatePost() {
  let navigate = useNavigate();

  const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);
  var cmID = getLastItem(window.location.href);

  const [post, setPost] = useState({
    communityID: cmID,
    title: "",
    body: "",
  });

  const isEnabled = post.title !== "" && post.body !== "";

  const postValues = (event) => {
    setPost((lastValue) => {
      return {
        ...lastValue,
        [event.target.name]: event.target.value,
      };
    });
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
        community_id: cmID,
      }),
    };

    const response = await fetch("http://localhost:8000/post/", info);
    const state = response.status;
    const data = await response.json();

    if (state === 201) {
      res = true;
    } else {
      alert(data.title);
      res = false;
    }
    return res;
  }

  function clickOnPost(event) {
    event.preventDefault();
    if (post.title !== "" && post.body !== "") {
      var res = fetchCreatePost();
      if (res) {
        var path = "/community/" + post.communityID;
        navigate(path, { replace: true });
      }
    } else alert("Both fields must be filled!");
  }

  return (
    <>
      <Header />
      <div className="container-post">
        <div className="card-post">
          <p>Community ID: {post.communityID}</p>
          <form onSubmit={clickOnPost}>
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
              className={` ${
                isEnabled ? "buttons-post enabled" : "buttons-post disabled"
              }`}
              type="submit"
              id="postbtn"
              disabled={!isEnabled}
            >
              POST
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
