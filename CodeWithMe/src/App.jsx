import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Submissions from "./pages/Submissions.jsx"
import Submission from "./pages/Submission.jsx"
import Problems from "./pages/Problems.jsx"
import Problem from "./pages/Problem.jsx"
import Signup from "./pages/Signup.jsx"
import CreateProblem from "./pages/CreateProblem.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"
import { Route, Routes, BrowserRouter,Link, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { useEffect, useState } from "react"


export default function App(){
  const [user, setUser] = useState("");
  const [loading, setloading] = useState(true);
  useEffect(()=>{
    async function call_fetch(){
        const response = await fetch(
          "http://localhost:5713/me",
          {
            method : "GET",
            headers:{
              "token": localStorage.getItem("token")
            }
          }
        )
        const resp = await response.json();
        if(!resp.success){setUser(null);}
        else setUser(resp.email);
        setloading(false);
    }
    call_fetch();
  },[])

  if(loading) return(<div>loading...</div>)
  return (
  <BrowserRouter>
        <div className="bg-red">
            <Navbar />
        </div>
        
    <Routes>
      <Route path = "/" element= {<ProtectedRoute user= {user}> <Home setUser={setUser} user={user}/> </ProtectedRoute>} />
      <Route path = "/login" element= {<Login setUser={setUser} />} />
      <Route path = "/problems" element= {<ProtectedRoute user= {user}> <Problems /> </ProtectedRoute>} />
      <Route path = "/submissions" element= {<ProtectedRoute user= {user}> <Submissions /> </ProtectedRoute>} />
      <Route path = "/problems/:id" element= {<ProtectedRoute><Problem /></ProtectedRoute>} />
      <Route path = "/submissions/:id" element= {<ProtectedRoute><Submission /></ProtectedRoute>} />
      <Route path = "/problems/create" element= {<ProtectedRoute><CreateProblem /></ProtectedRoute>} />
      <Route path = "/signup" element= {<Signup />} />
      <Route path = "*" element={<PageNotFound/>}/>
    </Routes>
  </BrowserRouter>
  )
}

