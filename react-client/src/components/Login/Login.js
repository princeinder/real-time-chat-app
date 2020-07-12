import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (props.location.state) {
      const error = props.location.state.error;
      setError(error);
    }
  });
  return (
    <div id="loginForm">
      <div className="loginFormGrid">
        <div className="title">
          <span style={{ fontSize: 20, padding: 10, marginBottom: 10 }}>
            Login To Join Chat Room
          </span>
        </div>
        <form className="loginForm">
          <span style={{ color: "red" }}> {error ? error : null}</span>
          <div className="form-group">
            <input
              required
              placeholder="Choose username"
              className="form-control"
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              required
              placeholder="Choose room"
              className="form-control"
              type="text"
              name="room"
              value={room}
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <Link
            onClick={(e) => (!username || !room ? e.preventDefault() : null)}
            to={`/chat?username=${username}&room=${room}`}
          >
            <button
              className="btn btn-primary btn-block"
              disabled={!username || !room ? true : false}
              type="button"
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
