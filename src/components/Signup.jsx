import React from "react";
import axios from "axios";
function signup(props) {
  const onsubmit = (e) => {
    e.preventDefault();
    props.page === "Register" ? props.onRegister(e.target[0].value, e.target[1].value, e.target[2].value):props.onLogin(e.target[0].value, e.target[1].value)
  };
  return (
    <div className="bhrosa" onSubmit={onsubmit}>
      <form className="signup">
        <h1 className="signhead">{props.page}</h1>
        <p className="signpara">Please Enter your name and username</p>
        {props.page === "Register" ? <input
          className="signfield"
          placeholder="Username"
          type="username"
          name="username"
        ></input> : null}
        <input
          className="signfield"
          placeholder="Email or Username"
          type="email"
          name="email"
        ></input>
        <br></br>
        <input
          className="signfield"
          placeholder="Password"
          type="password"
          name="password"
        ></input>
        <br />
        <a className="signpara" href = "/register">{props.content}</a>
        <br />
        <button className="signfield" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default signup;
