import React, { useState, useEffect } from 'react'
import "./register.css"
import { Link } from 'react-router-dom';
import logo from "../assets/chatC.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
import { toastFeatures } from '../utils/toastFeatures';
import { registerRoute } from '../utils/BackendRoutes';
import LoginButtons from '../components/LoginButtons';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      navigate("/");
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationHandler()) {
      const { username, password, confirmPassword, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
    const { username, password, confirmPassword, email } = values;
    if (password != confirmPassword) {
      toast.error("Passwords do not match. Please re-enter", toastFeatures)
      return false;
    }
    if (username.length < 5) {
      toast.error("Username should be more than 5 characters", toastFeatures)
      return false;
    }
    if (password.length < 8) {
      toast.error("The Password must consist of at least 8 characters.", toastFeatures)
      return false;
    }
    if (email === "") {
      toast.error("Email is Required Field", toastFeatures)
      return false;
    }
    return true;

  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='registerFormContainer'>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Chatly</h1>
          </div>
          <input type='text' placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
          <input type='email' placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
          <input type='password' placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
          <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} />
          <button type='submit' className='btn'>Register</button>
          <LoginButtons />
          <span>Already have an account ? <Link to="/login">Login </Link></span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register