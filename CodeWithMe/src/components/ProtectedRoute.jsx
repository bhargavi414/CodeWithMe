import {Link, useNavigate} from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";

export default function ProtectedRoute({children}){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function verify(){
        const response =await fetch(
            "http://localhost:5713/profile", 
            {
                method: "GET",
                headers: {
                    "token" : localStorage.getItem("token")
                }
            }
        )

        const resp= await response.json();
        if(!resp.success) {
            navigate("/login");
            return;
        }
        setLoading(false);
    }
    verify();
    }, [])

    if(loading) return(<div>loading...</div>)
    else return(children)
}