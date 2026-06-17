import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Submissions from "./pages/Submissions.jsx"
import Problems from "./pages/Problems.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"
import { Route, Routes, BrowserRouter,Link } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"



export default function App(){
  return (

  <BrowserRouter>
        <div className="bg-red">
            <Navbar />
        </div>
        
    <Routes>
      <Route path = "/" element= {<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path = "/login" element= {<Login />} />
      <Route path = "/problems" element= {<Problems />} />
      <Route path = "/submissions" element= {<Submissions />} />
      <Route path = "*" element={<PageNotFound/>}/>
    </Routes>
  </BrowserRouter>
  )
}

