import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[error, setError]= useState("")
    const navigate = useNavigate()
    return(
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="bg-white w-96 p-8 rounded-xl shadow space-y-4">
            <div className="text-2xl font-bold text-center">Enter your credentials</div>

            <div className="font-bold">
                Email
                <input
                className=" w-full border p-2 rounded shadow"
                onChange={(event) => setEmail(event.target.value)}
                />            
            </div>

            <div className="font-bold">
                Password
                <input
                type="password"
                className=" w-full border p-2 rounded shadow "
                onChange={(event) => setPassword(event.target.value)}
                />
            </div>
             
             <div className="text-red-500 text-sm font-bold text-center">
                {(error!="") && <div> {error} </div>}
            </div>

            <div>
                <button 
                className="w-full bg-gray-500 font-bold  p-2 rounded-lg"
                onClick= {async () => {
                    if (email == "") {
                        setError("Enter email");
                        return
                    }
                    if (password==""){
                        setError("Enter password")
                        return 
                    }
                    setError("");
                    
                    console.log("button clicked")
                    const response = await fetch(
                        "http://localhost:5713/login", 
                        {  method: "POST",
                           body: JSON.stringify({email, password}),
                           headers: {
                            "Content-Type": "application/json"
                           }
                        });
                    const result = await response.json();
                    if(result.success){
                        localStorage.setItem("token", result.token);
                        navigate("/");
                    }
                    else{
                        setError(result.error);
                    }

                    
                    
                }}
                >
                Login
                </button>
                
             </div>
        </div>
    </div>

    )
}