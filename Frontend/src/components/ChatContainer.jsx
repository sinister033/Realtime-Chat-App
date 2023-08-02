import React, { useState, useEffect, useRef } from "react";
import "./chatContainer.css";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid"
import { getAllMessagesRoute, sendMessageRoute } from "../utils/BackendRoutes";
import axios from "axios";


const ChatContainer = ({ currentChat, currentUser, socket }) => {

  const [messages, setMessages] = useState([])
  const [messageArrived, setMessageArrived] = useState(null)
  const scrollRef = useRef()
  useEffect(() => {
    const fetched = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        }
        )
        setMessages(response.data)
      }
    }
    fetched();


  }, [currentChat])
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msgRecieve", (msg) => {
        setMessageArrived({ self: false, message: msg })
      })
    }
  }, [])

  useEffect(() => {
    messageArrived && setMessages(prev => [...prev, messageArrived])
  }, [messageArrived])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages])

  const messageSendHandler = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    })
    socket.current.emit("sendMsg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg
    })
    const msegs = [...messages];
    msegs.push({ self: true, message: msg });
    setMessages(msegs)
  }
  return (
    <div className="mainChatContainer">
      <div className="chatHeader">
        <div className="userDetails">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chatMessages">
        {messages.map((msg) => {
          return <div ref={scrollRef} key={uuidv4()}>
            <div className={`message ${msg.self ? "sended" : "recieved"}`}>
              <div className="content">
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        })}
      </div>
      <ChatInput messageSendHandler={messageSendHandler} />
    </div>
  );
};

export default ChatContainer;
