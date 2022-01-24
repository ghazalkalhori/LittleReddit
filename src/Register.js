import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./Login.css";

export default function Register() {
  // --------------- States
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    visibility: false,
  });
  const [warnUS, setWarnUS] = useState(false);
  const [warnPASS, setWarnPASS] = useState(false);
  const [warnEM, setWarnEM] = useState(false);

  // --------------- Handlers
  const clickVisibility = () => {
    setValues({ ...values, visibility: !values.visibility });
  };

  const registerValues = (event) => {
    setValues((lastValue) => {
      return {
        ...lastValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  // at least one number, one lowercase and one uppercase letter, 8 chars
  function verifyPassword(str) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test(str);
  }

  function verifyEmail(str) {
    return str.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  const clickRegister = (e) => {
    var passVer = true,
      emVer = true;
    e.preventDefault();
    setWarnUS(false);
    setWarnPASS(false);
    setWarnEM(false);

    // handle empty inputs
    if (values.username === "") setWarnUS(true);
    if (values.password === "") setWarnPASS(true);
    if (values.email === "") setWarnEM(true);

    //  handle password format
    if (values.password !== "" && !verifyPassword(values.password)) {
      alert(
        "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters!"
      );
      passVer = false;
      setWarnPASS(true);
    }

    // handle email format
    if (values.email !== "" && !verifyEmail(values.email)) {
      alert("Invalid email!");
      emVer = false;
      setWarnEM(true);
    }

    if (!warnUS && passVer && emVer) {
      alert("Successful Submit!"); //send to server ???
      <Link to="/home"></Link>;
    }
  };

  // --------------- HTML View
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="text">
            <h3>Sign Up</h3>
          </div>
          <form onSubmit={clickRegister}>
            <div className="input-text">
              <input
                name="email"
                type="text"
                placeholder="EMAIL"
                value={values.email}
                onChange={registerValues}
                className={` ${warnEM ? "warning" : ""}`}
              />
            </div>

            <div className="input-text">
              <input
                name="username"
                type="text"
                placeholder="USERNAME"
                value={values.username}
                onChange={registerValues}
                className={` ${warnUS ? "warning" : ""}`}
              />
            </div>

            <div className="input-text">
              <input
                name="password"
                type={values.visibility ? "text" : "password"}
                placeholder="PASSWORD"
                value={values.password}
                onChange={registerValues}
                className={` ${warnPASS ? "warning" : ""}`}
              />
              <IconButton onClick={clickVisibility} class="btn">
                {values.visibility ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            <div className="buttons">
              <button type="submit">CREATE ACCOUNT</button>
            </div>

            <div className="forgot">
              <h3>
                Already a redditor? <Link to="/">SIGN IN</Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
