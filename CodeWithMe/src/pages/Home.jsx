import {Link, useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import { useState } from "react";

export default function Home ({setUser, user}) {
    const navigate = useNavigate();

    return(
        <div>
            <div>
                Home
                <div>{user}</div>
            </div>
            <button 
            onClick={()=>{
                localStorage.removeItem("token")
                setUser(null);
                navigate("/login")}}>
                LOGOUT
            </button>

        </div>
        
    )
}