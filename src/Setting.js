import "./Login.css";
import Header from "./Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function Setting() {
  let navigate = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [email, SetEmail] = useState("");
  const [visibility, SetVisibility] = useState(false);

  function verifyPassword(str) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test(str);
  }

  function verifyEmail(str) {
    return str.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  async function fetchChangeInfo() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    };
    const response = await fetch("http://localhost:8000/user/", info);
    const state = response.status;
    const data = await response.json();

    if (state === 201) {
      alert("User info changed successfully.");
      navigate("/", { replace: true });
    } else {
      alert(data.message);
    }
  }

  function changeVisibility() {
    SetVisibility(!visibility);
  }

  const clickChange = (event) => {
    event.preventDefault();
    var totalValid = true;
    var usernameGiven = false;
    var passwordGiven = false;
    var emailGiven = false;

    if (username !== "") usernameGiven = true;

    if (password !== "") {
      passwordGiven = true;
      if (!verifyPassword(password)) {
        totalValid = false;
        alert(
          "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters!"
        );
      }
    }

    if (email !== "") {
      emailGiven = true;
      if (!verifyEmail(email)) {
        totalValid = false;
        alert("Invalid email!");
      }
    }

    if (usernameGiven || passwordGiven || emailGiven) {
      if (totalValid) {
        fetchChangeInfo();
      }
    } else alert("One field must be filled at least !");
  };

  return (
    <>
      <Header />

      <div className="container-setting">
        <div className="card">
          <div className="text">
            <h3>Setting</h3>
          </div>
          <form onSubmit={clickChange}>
            <div className="input-text">
              <input
                name="email"
                type="text"
                placeholder="NEW EMAIL"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </div>

            <div className="input-text">
              <input
                name="username"
                type="text"
                placeholder="NEW USERNAME"
                value={username}
                onChange={(e) => SetUsername(e.target.value)}
              />
            </div>

            <div className="input-text">
              <input
                name="password"
                type={visibility ? "text" : "password"}
                placeholder="NEW PASSWORD"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
              />
              <IconButton onClick={changeVisibility} class="eye">
                {visibility ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            <div className="buttons">
              <button type="submit">CHANGE</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
