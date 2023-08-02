import React, { useState, useEffect } from 'react'
import "./login.css"
import "./register.css"
import { Link } from 'react-router-dom';
import logo from "../assets/chatC.png";
import { toastFeatures } from '../utils/toastFeatures';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { loginRoute } from '../utils/BackendRoutes';
import LoginButtons from '../components/LoginButtons';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      navigate("/");
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationHandler()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });
      if (data.status === false) {
        toast.error(data.message, toastFeatures)
      }
      if (data.status === true) {
        localStorage.setItem("chat-user", JSON.stringify(data.user))
        navigate("/");
      }
    }
  }
  const validationHandler = (e) => {
    const { username, password } = values;
    if (username === "" && password === "") {
      toast.error("Username and Password are required field!", toastFeatures);
      return false;
    }
    else if (password === "") {
      toast.error(" Password is required field!", toastFeatures)
      return false;
    }
    else if (username === '') {
      toast.error("Username is required field!", toastFeatures)
      return false;
    }

    return true;

  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='loginFormContainer'>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Chatly</h1>
          </div>
          <input type='text' placeholder='Username' name='username' onChange={(e) => handleChange(e)} min="5" />
          <input type='password' placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
          <button type='submit' className='btn'>Login</button>
          <LoginButtons />
          <span>Don't have an account ? <Link to="/register">Register </Link></span>
        </form >
      </div >
      <ToastContainer />
    </>
  )
}

export default Login