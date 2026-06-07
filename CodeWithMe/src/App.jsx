import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Submissions from "./pages/Submissions.jsx"
import Problems from "./pages/Problems.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"
import { Route, Routes, BrowserRouter,Link } from "react-router-dom"



export default function App(){
  return (
  <BrowserRouter>
    <Routes>
      <Route path = "/" element= {<Home />} />
      <Route path = "/login" element= {<Login />} />
      <Route path = "/problems" element= {<Problems />} />
      <Route path = "/submissions" element= {<Submissions />} />
      <Route path = "*" element={<PageNotFound/>}/>
    </Routes>
  </BrowserRouter>
  )
}

