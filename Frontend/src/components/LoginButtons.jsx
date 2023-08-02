import React from 'react'
import "./loginButton.css"
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css"
import { firebaseLoginRoute } from '../utils/BackendRoutes';
import { useNavigate } from 'react-router-dom';

const LoginButtons = () => {
    const navigate = useNavigate();
    const providers = {
        google: new GoogleAuthProvider(),
    }

    const firebaseLogin = async (loginType) => {
        try {
            const provider = providers[loginType];
            const userData = await signInWithPopup(firebaseAuth, provider);
            const email = userData.user.email ? userData.user.email : userData.user.providerData[0].email;
            const { data } = await axios.post(firebaseLoginRoute, { email });
            // console.log(data);
            if (data.status) {
                localStorage.setItem("chat-user", JSON.stringify(data.user))
                navigate("/");
            } else {
                navigate("/setUsername");
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='socialBtnContainer'>
            <button type='button' onClick={() => firebaseLogin("google")}>
                Login With Google &nbsp;<FcGoogle />
            </button>

        </div>
    )
}

export default LoginButtons