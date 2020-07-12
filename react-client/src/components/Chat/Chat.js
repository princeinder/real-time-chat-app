import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import { Widget } from "react-chat-widget";
import ChatBot from "react-simple-chatbot";
import "./Chat.css";
import "react-chat-widget/lib/styles.css";

let socket;

const ChatRoom = ({ location }) => {
  var bot = { id: 0 };
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState([]);
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(username);
    socket.emit("join", { username, room }, (error) => {
      if (error) {
        setError(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      document.getElementById("chatForm").reset();
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  if (error == 404) {
    return <div className="404">{error + " not found"}</div>;
  }

  if (error == 401) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { error: "Username is taken" },
        }}
      />
    );
  }
  return (
    <div className="mainWindow">
      <div className="title">Welcome to chat room </div>
      <div className="content">
        <div className="sidebarWrapper">
          <div className="leftwrapper">
            <div className="legend">{room + "(" + users.length + ")"}</div>
            <div className="roomUsers">
              <ul>
                {users ? users.map((user) => <li>{user.username}</li>) : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="chatWindow">
          <ul className="chat" id="chatList">
            {messages.map((data) => (
              <div className="chatdata">
                <li className="other">
                  <div className="msg">
                    <div className="message">{data.text}</div>
                  </div>
                  <div className="date">{data.date}</div>
                </li>
                <div className="username">
                  {name == data.user ? "Me" : data.user}
                </div>
              </div>
            ))}
          </ul>
          <div className="chatInputWrapper">
            <form id="chatForm">
              <input
                className="textarea input"
                type="text"
                placeholder="Enter your message..."
                onChange={(event) =>
                  setMessage(event.target.value) && event.target.value == ""
                }
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={sendMessage}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
