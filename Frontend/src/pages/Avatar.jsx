import "./avatar.css"
import React, { useState, useEffect } from 'react'
import "./register.css"
import { ToastContainer, toast } from "react-toastify";
import loaderr2 from "../assets/loaderr2.gif"
import axios from "axios"
import { toastFeatures } from "../utils/toastFeatures";
import { useNavigate } from 'react-router-dom';
import { Buffer } from "buffer";
import "react-toastify/dist/ReactToastify.css"
import { avatarRoute } from '../utils/BackendRoutes';

const Avatar = () => {
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const avatarApi = "https://api.multiavatar.com/45678945";

    useEffect(() => {
        if (!localStorage.getItem("chat-user")) {
            navigate("/login");
        }

    })
    const setProfile = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Choose an avatar, its required", toastFeatures);
        }
        else {
            const user = await JSON.parse(localStorage.getItem("chat-user"));
            const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })
            // console.log(data);
            if (data?.avatarSet) {
                user.HasAvatarImage = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-user', JSON.stringify(user));
                navigate("/")

            }
            else {
                toast.error("Error in Avatar setup, Please Retry", toastFeatures)
            }
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 5; i++) {
                const image = await axios.get(`${avatarApi}/${Math.floor((Math.random()) * 1000)}`)
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setShowLoader(false);
        }
        fetchData();

    }, [])
    return (
        <>
            {showLoader ? <div className="avatarContainer">
                <img src={loaderr2} alt="loading..." className="loader" />
            </div> :
                (
                    <div className="avatarContainer">
                        <div className="title-container">
                            <h1>  Choose an Avatar for Profile </h1>
                        </div>
                        <div className="avatars">
                            {avatars.map((avatar, idx) => {
                                return <div key={idx} className={`avatar ${(selectedAvatar === idx) ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="image" onClick={() => setSelectedAvatar(idx)} />
                                </div>
                            })}
                        </div>
                        <button className="submitBtn" onClick={() => setProfile()}>Set As Profile</button>
                    </div>
                )
            }
            < ToastContainer />
        </>
    )
}

export default Avatar