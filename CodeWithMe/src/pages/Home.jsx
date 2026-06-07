import {Link} from "react-router-dom"

export default function Home () {
    return(
    <div className="bg-red">
        Home
        <Link to= "/login"> 
             Login
        </Link>
    </div>
    )
}