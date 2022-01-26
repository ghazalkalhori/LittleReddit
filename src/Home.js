import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Post from "./Post";
import Header from "./Header";

import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

export default function Home() {
  let navigate = useNavigate();
  const [communityName, SetCommunityName] = useState("");
  const [communityDsp, SetCommunityDsp] = useState("");

  async function fetchCreateCm() {
    var res;
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        name: communityName,
        descriptions: communityDsp,
      }),
    };

    const response = await fetch("http://localhost:8000/cm/", info);
    const state = response.status;
    const data = await response.json();

    if (state === 201) {
      alert("Community created successfully.");
      localStorage.setItem(communityName, data.id);
      localStorage.setItem("currCm", communityName);
      res = true;
    } else {
      alert(data.name);
      res = false;
    }
    return res;
  }

  function clickOnCreateCm() {
    if (communityName !== "" && communityDsp !== "") {
      var worked = fetchCreateCm();
      if (worked) {
        var path = "/community/" + communityName;
        navigate(path, { replace: true });
      }
    } else alert("Both fields must be filled!");
  }

  function sortPosts(sortParam) {
    // send sortParam to server and redirect to community page
  }

  // function ShowPosts(item) {
  //   return (
  //     <Post
  //       community={item?.community}
  //       author={item?.author}
  //       time={item?.time}
  //       title={item?.title}
  //       body={item?.body}
  //       commentNum={item?.commentNum}
  //       likeNum={item?.likeNum}
  //     />
  //   );
  // }

  return (
    <>
      <Header />

      <div className="allcont">
        {/* posts and sorting */}
        <div className="leftbar">
          <div class="sortbar">
            SORT BY:
            <IconButton onClick={sortPosts("time")}>
              <AccessTimeIcon className="ic" />
            </IconButton>
            <IconButton onClick={sortPosts("like")}>
              <FavoriteBorderOutlinedIcon className="ic" />
            </IconButton>
            <IconButton onClick={sortPosts("comment")}>
              <ChatBubbleOutlineOutlinedIcon className="ic" />
            </IconButton>
          </div>
          <Post />
          <Post />
          <Post />
        </div>

        <div class="rightbar">
          {/* trends box */}
          <div class="column trend">
            <h3>TOP COMMUNITIES</h3>
            <ul>
              <li>ONE</li>
              <li>TWO</li>
              <li>THREE</li>
              <li>FOUR</li>
              <li>FIVE</li>
            </ul>

            <button className="viewBtn">
              <Link className="viewBtn" to="/communities">
                VIEW ALL
              </Link>
            </button>
          </div>

          {/* creation box */}
          <div class="column create">
            <form onSubmit={clickOnCreateCm}>
              <input
                className="cm"
                type="text"
                placeholder="Comunity Name"
                value={communityName}
                onChange={(e) => SetCommunityName(e.target.value)}
              />
              <textarea
                className="body-cm"
                placeholder="Text"
                rows="4"
                cols="50"
                value={communityDsp}
                onChange={(e) => SetCommunityDsp(e.target.value)}
              />
              <button type="submit" className="createBtn">
                <i class="fa fa-user-plus"></i>
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
