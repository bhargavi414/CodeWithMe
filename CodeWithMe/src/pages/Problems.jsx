import {Link} from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Problems () {
    const problems = [
        {id: 1, title: "Two sum", difficulty: "easy", submitted: false},
        {id: 2, title: "Reverse linked list", difficulty: "easy", submitted: false}
    ];
    
    return (
    <div className="bg-white p-6">
        {/* Header */}
        <div className="flex font-bold border-b pb-3 mb-3 text-gray-700">
            <div className="w-15">Status</div>
            <div className="flex-1">Problem</div>
            <div className="w-20">Difficulty</div>
        </div>

        {/* Problem List */}
        {problems.map((problem) => {
            return (
                <div
                    key={problem.id}
                    className="flex items-center py-3 border-b hover:bg-gray-50 transition"
                >
                    {/* Status */}
                    <div className="w-10 text-lg">
                        {problem.submitted ? "✔" : "○"}
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                        <Link
                            to={`/problems/${problem.id}`}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            {problem.title}
                        </Link>
                    </div>

                    {/* Difficulty */}
                    <div className="w-20 text-sm text-gray-600 capitalize">
                        {problem.difficulty}
                    </div>
                </div>
            );
        })}
    </div>
    );
}