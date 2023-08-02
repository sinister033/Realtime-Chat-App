import React, { useState, useEffect } from 'react'
import "./setusername.css"
import { toastFeatures } from '../utils/toastFeatures';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { checkUser, loginRoute, registerRoute } from '../utils/BackendRoutes';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { debounce } from '../utils/debouncing';
const Login = () => {

    onAuthStateChanged(firebaseAuth, (userData) => {
        if (!userData) {
            navigate("/login");
        } else {
            setSocialEmail(userData.email ? userData.email : userData.providerData[0].email)
        }
    })
    const navigate = useNavigate();
    const [values, setValues] = useState("");
    const [labelText, setLabelText] = useState("");
    const [socialEmail, setSocialEmail] = useState(undefined);
    const [userStatus, setUserStatus] = useState(undefined);

    useEffect(() => {
        if (localStorage.getItem("chat-user")) {
            navigate("/");
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validationHandler()) {
            const { data } = await axios.post(registerRoute, {
                username: values,
                email: socialEmail,
                password: (Math.random() + 1).toString(15).substring(1)

            });
            if (data.status === false) {
                toast.error(data.msg, toastFeatures)
            }
            if (data.status === true) {
                localStorage.setItem("chat-user", JSON.stringify(data.user))
                navigate("/");
            }
        }
    }
    const validationHandler = (e) => {
        if (values.length < 4) {
            toast.error("Username is required and should be greater tha 4 characters", toastFeatures);
            return false;
        }
        return true;

    }

    const handleChange = debounce((username) => usernameAvailabilityCheck(username), 300)
    const usernameAvailabilityCheck = async (username) => {
        if (username.length > 4) {
            const { data } = await axios.post(checkUser, { username });
            // console.log(data);
            setUserStatus(data.status);
            setLabelText(data.msg);
            setValues(username)
        }
    }
    return (
        <>
            {socialEmail && (<div className='setUserFormContainer'>
                <form onSubmit={handleSubmit}>
                    <span>Validate Username Availability</span>
                    <div className="row">
                        <input type='text' placeholder='Username' className={`${userStatus ? "success" : userStatus !== undefined ? "danger" : ""}`} name='username' onChange={(e) => handleChange(e.target.value)} min="5" />
                        <label htmlFor='' className={`${userStatus ? "success" : userStatus !== undefined ? "danger" : ""}`}>{labelText}</label>
                        <button type='submit' className='btn'>Set User</button>
                    </div>
                </form >
            </div >)}
            <ToastContainer />
        </>

    )
}

export default Login