import "./Login.css";
import Header from "./Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditCommunity() {
  let navigate = useNavigate();
  const [name, SetName] = useState("");
  const [descriptions, SetDescriptions] = useState("");

  const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);
  var cmID = getLastItem(window.location.href);

  async function fetchChangeInfo() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        name: name,
        descriptions: descriptions,
      }),
    };
    var path = "http://localhost:8000/edit/" + cmID + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 201) {
      alert("Community info changed successfully.");
      navigate("/community/" + cmID, { replace: true });
    } else {
      alert(data.message);
    }
  }

  const clickChange = (event) => {
    event.preventDefault();
    if (name !== "" || descriptions !== "") fetchChangeInfo();
    else alert("One field must be filled at least !");
  };

  return (
    <>
      <Header />
      <div class="container-setting ">
        <div className="card cmcbox">
          <div className="text">
            <h3>Edit Community</h3>
          </div>
          <form onSubmit={clickChange}>
            <input
              className="input-text cmname"
              type="text"
              placeholder="Comunity Name"
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
            <textarea
              className="body-cm"
              placeholder="Descriptions"
              rows="4"
              cols="50"
              value={descriptions}
              onChange={(e) => SetDescriptions(e.target.value)}
            />
            <button type="submit" className="buttons cmbtn">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
