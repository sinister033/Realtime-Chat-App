import React, { useState, useEffect } from 'react'
import "./welcome.css"
import robo from "../assets/hiiRobu2.gif"

const Welcome = () => {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const setUser = async () => {
            setUserName(
                await JSON.parse(
                    localStorage.getItem("chat-user")
                ).username
            );
        }
        setUser();
    }, []);
    return (
        <div className='welcomeContainer'>
            <img src={robo} alt='robo' />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Start Conversation now 😊 </h3>
        </div>
    )
}

export default Welcome