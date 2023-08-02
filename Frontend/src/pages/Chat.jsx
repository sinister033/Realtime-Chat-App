import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./chat.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { host } from "../utils/BackendRoutes";
import { getAllUsersRoute } from "../utils/BackendRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";


const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const checkingUser = async () => {
      if (!localStorage.getItem("chat-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")));
      }
    };
    checkingUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    const checkingData = async () => {
      if (currentUser) {
        if (currentUser.HasAvatarImage) {
          const data = await axios.get(
            `${getAllUsersRoute}/${currentUser._id}`
          );
          setContacts(data.data);
        } else {
          navigate("/avatar");
        }
      }
    };
    checkingData();
  }, [currentUser]);

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className="chatContainer">
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChangeChat}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </div>
  );
};

export default Chat;
