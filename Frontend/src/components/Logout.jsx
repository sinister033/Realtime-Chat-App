import React from 'react'
import "./logout.css"
import { useNavigate } from 'react-router-dom'
import { BiLogOutCircle } from "react-icons/bi"
const Logout = () => {
    const navigate = useNavigate();
    const logoutHandler = async () => {
        localStorage.clear();
        navigate('/login');

    }
    return (
        <div className='logoutBtn' onClick={logoutHandler}><BiLogOutCircle /></div>
    )
}

export default Logout