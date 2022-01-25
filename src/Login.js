import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./Login.css";

export default function Login() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
    visibility: false,
  });
  const [warnUS, setWarnUS] = useState(false);
  const [warnPASS, setWarnPASS] = useState(false);

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

  function validateInfo() {
    // initialization
    setWarnUS(false);
    setWarnPASS(false);

    if (values.username === "") setWarnUS(true);
    if (values.password === "") setWarnPASS(true);
  }

  async function fetchLogin() {
    const info = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    };
    const response = await fetch("http://localhost:8000/login/", info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      alert("You have logged in successfully");
      localStorage.setItem("token", data.token);
      navigate("/home", { replace: true });
    } else {
      alert(data.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateInfo();

    if (!warnUS && !warnPASS) {
      fetchLogin();
    }
  }

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="text">
            <h3>WELCOME!</h3>
          </div>
          <form onSubmit={handleSubmit}>
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
