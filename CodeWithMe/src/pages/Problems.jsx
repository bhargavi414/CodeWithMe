import {Link} from "react-router-dom"
import Navbar from "../components/Navbar"
import { useState } from "react";
import { useEffect } from "react";

export default function Problems () {
    const [problems, setProblems] = useState([]);
    
    useEffect(()=>{
        async function fetchProblems(){
            const response = await fetch(
                `http://localhost:5713/problems`
            )

            const result = await response.json();
            setProblems(result)
        }
        fetchProblems();
    },[]);

return ( <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">

        <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
                Problems
            </h1>

            <Link
                to="/problems/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                + Create Problem
            </Link>

        </div>

        {/* Header */}
        <div className="flex font-bold border-b pb-3 mb-3 text-gray-700">

            <div className="w-16">
                Status
            </div>

            <div className="flex-1">
                Problem
            </div>

            <div className="w-28">
                Difficulty
            </div>

        </div>

        {/* Problems */}
        {problems.map((problem) => {

            const difficultyColor =
                problem.difficulty === "Easy"
                    ? "bg-green-500"
                    : problem.difficulty === "Medium"
                    ? "bg-yellow-500"
                    : "bg-red-500";

            return (
                <div
                    key={problem._id}
                    className="flex items-center py-4 border-b hover:bg-gray-50 rounded-lg transition"
                >

                    {/* Status */}
                    <div className="w-16 text-lg">
                        {problem.submitted ? "✔" : "○"}
                    </div>

                    {/* Problem */}
                    <div className="flex-1">

                        <Link
                            to={`/problems/${problem._id}`}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            {problem.title}
                        </Link>

                    </div>

                    {/* Difficulty */}
                    <div className="w-28">

                        <span
                            className={`text-white text-sm px-3 py-1 rounded-full ${difficultyColor}`}
                        >
                            {problem.difficulty}
                        </span>

                    </div>

                </div>
            );
        })}

    </div>

</div>
);

}