import {Link} from "react-router-dom"

export default function Navbar(){
    return(
    <div>
        <Link to= '/' style={{fontWeight: "bold"}}> Home </Link> 
        <Link to= '/login' style={{fontWeight: "bold"}}>Login </Link> 
        <Link to= '/problems' style={{fontWeight: "bold"}}>Problems </Link> 
        <Link to= '/submissions' style={{fontWeight: "bold"}}>Submissions </Link>
    </div>
    )
}