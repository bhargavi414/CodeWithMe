import {Link, useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import { useState } from "react";

export default function Home () {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // useEffect (()=>{
        async function getEmail(){
            const response = await fetch(
                "http://localhost:5713/profile",
                {
                    method: "GET",
                    headers:{
                        "token": localStorage.getItem("token")
                    }
                }
            )
            const resp = await response.json();
            setEmail(resp.email);
        }
        getEmail();
    // },[])

    return(
        <div>
            <div>
                Home
                <div>{email}</div>
            </div>
            <button 
            onClick={()=>{
                localStorage.removeItem("token")
                navigate("/login")}}>
                LOGOUT
            </button>

        </div>
        
    )
}