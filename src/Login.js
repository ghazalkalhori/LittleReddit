import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./Login.css";

export default function Login() {
  var token = "";
  // --------------- States
  const [values, setValues] = useState({
    username: "",
    password: "",
    visibility: false,
  });
  const [warnUS, setWarnUS] = useState(false);
  const [warnPASS, setWarnPASS] = useState(false);

  // --------------- Handlers
  const clickVisibility = () => {
    setValues({ ...values, visibility: !values.visibility });
  };

  const loginValues = (event) => {
    setValues((lastValue) => {
      return {
        ...lastValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const clickLogin = (e) => {
    e.preventDefault();
    setWarnUS(false);
    setWarnPASS(false);

    if (values.username === "") setWarnUS(true);
    if (values.password === "") setWarnPASS(true);

    if (!warnUS && !warnPASS) {
      // post request to server
      const requestOptions = {
        method: "POST",
        headers: { "Authentication" : token},
        body: JSON.stringify({ username: values.username, password:values.password }),
      };

      fetch("https://reqres.in/api/posts", requestOptions)
        .then((response) => response.json())
        .then((data) => this.setState({ postId: data.id }));

      alert("Successful Submit!"); //send to server ???
      <Link to="/home">fffff</Link>; // how
    }
  };

  // --------------- HTML View
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="text">
            <h3>WELCOME!</h3>
          </div>
          <form onSubmit={clickLogin}>
            <div className="input-text">
              <input
                name="username"
                type="text"
                placeholder="USERNAME"
                value={values.username}
                onChange={loginValues}
                className={` ${warnUS ? "warning" : ""}`}
              />
            </div>

            <div className="input-text">
              <input
                name="password"
                type={values.visibility ? "text" : "password"}
                placeholder="PASSWORD"
                value={values.password}
                onChange={loginValues}
                className={` ${warnPASS ? "warning" : ""}`}
              />
              <IconButton onClick={clickVisibility} class="eye">
                {values.visibility ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            <div className="buttons">
              <button type="submit">LOGIN</button>
            </div>

            <div className="change">
              <h3>
                New to Reddit? <Link to="/register">SIGN UP</Link>
              </h3>
              <h3>
                ------ <Link to="/home">HOME </Link>
                ------ <Link to="/community">Community </Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
