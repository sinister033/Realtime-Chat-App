import React, { useState, useEffect } from "react";
import logo from "../assets/chatC.png";
import "./contacts.css"

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelectedUser, setCurrentSelectedUser] = useState(undefined);


    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);
    const changeCurrentChat = (idx, contact) => {
        setCurrentSelectedUser(idx);
        changeChat(contact)
    };

    return (
        <>
            {currentUserImage && currentUserName && (
                <div className="contactContainer">
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h3>Chatly</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, idx) => {
                            return (
                                <div
                                    className={`contact ${idx === currentSelectedUser ? "selected" : ""
                                        }`}
                                    key={idx}
                                    onClick={() => changeCurrentChat(idx, contact)}
                                >
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    <div className="currentUser">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default Contacts;
