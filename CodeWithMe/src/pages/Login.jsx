import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    return(
    <div className="bg-red">
        enter your email
        <input
        onChange={(event) => setEmail(event.target.value)}
        />            
        enter your password
        <input
        onChange={(event) => setPassword(event.target.value)}
        />  
        
        <button 
        onClick={()=>navigate("/")}
        >Login
        </button>
    </div>
    )
}