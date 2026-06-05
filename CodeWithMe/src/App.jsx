import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Submissions from "./pages/Submissions.jsx"
import Problems from "./pages/Problems.jsx"


export default function App(){
  let current_page = "abc";

    if(current_page=="Home"){
      return(<Home />)
    }
    else if (current_page=="Login"){
    return(<Login />)
    }
    else if (current_page=="Submissions"){
    return(<Submissions />)
    }
    else if (current_page=="Problems"){
    return(<Problems />)
    }
    else{
      return(
        <div className="bg-red-500">
          Error 404- page not found
        </div>
      )
    }
}
