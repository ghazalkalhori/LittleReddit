import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Post from "./Post";
import Header from "./Header";
import IconButton from "@material-ui/core/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  var communityID = "";
  const [enteredHome, SetEnteredHome] = useState(true);
  const [communityName, SetCommunityName] = useState("");
  const [communityDsp, SetCommunityDsp] = useState("");
  const [posts, SetPosts] = useState([]);
  const [hots, SetHots] = useState([]);

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
      communityID = data.id;
      res = true;
    } else {
      alert(data.name);
      res = false;
    }
    return res;
  }

  async function clickOnCreateCm(event) {
    event.preventDefault();
    if (communityName !== "" && communityDsp !== "") {
      var res = await fetchCreateCm();
      if (res) {
        var path = "/community/" + communityID;
        navigate(path, { replace: true });
      }
    } else alert("Both fields must be filled!");
  }

  async function fetchHomePosts(sortParam) {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };
    var path = "http://localhost:8000/home/?sort=" + sortParam;
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetPosts(data.results);
    } else {
      alert(data.message);
    }
  }

  async function fetchHomeHots() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "GET",
      headers: { Authorization: token },
    };

    const response = await fetch("http://localhost:8000/cm/hot/", info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      SetHots(data);
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

  function ShowHots(item) {
    return (
      <li className="hot">
        <Link className="hot" to={"/community/" + item?.id}>
          {item?.name}
        </Link>
      </li>
    );
  }

  // fetch whenever refreshes
  if (enteredHome) {
    fetchHomePosts("time");
    fetchHomeHots();
    SetEnteredHome(false);
  }

  return (
    <>
      <Header />

      <div className="allcont">
        {/* posts and sorting */}
        <div className="leftbar">
          <div class="sortbar">
            SORT BY:
            <IconButton onClick={() => fetchHomePosts("time")}>
              <AccessTimeIcon className="ic clock" />
            </IconButton>
            <IconButton onClick={() => fetchHomePosts("like")}>
              <FavoriteBorderOutlinedIcon className="ic heart" />
            </IconButton>
            <IconButton onClick={() => fetchHomePosts("comment")}>
              <ChatBubbleOutlineOutlinedIcon className="ic cmnt" />
            </IconButton>
          </div>
          {posts.map((item) => ShowPosts(item))}
        </div>

        <div class="rightbar">
          {/* trends box */}
          <div class="column trend">
            <h3>TOP COMMUNITIES</h3>
            <ul>{hots.map((item) => ShowHots(item))}</ul>
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
                placeholder="Descriptions"
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
