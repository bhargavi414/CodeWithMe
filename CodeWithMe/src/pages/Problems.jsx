import {Link} from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Problems () {
    const problems = [
        {id: 1, title: "Two sum", difficulty: "easy", submitted: "NO"},
        {id: 2, title: "Reverse linked list", difficulty: "easy", submitted: "NO"}
    ];
    
    return(
      <div>
         {problems.map((problem)=>{
              return(
                 <div>
                    <Link to={`/problems/${problem.id}`}> {problem.title} </Link>
                 </div>
              )
         })}

      </div>
   )
}