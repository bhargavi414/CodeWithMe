import {Link} from "react-router-dom"
import { Children, useState } from "react";
import { useEffect } from "react";

export default function Submissions () {
    const [history, setHistory]=useState([]);
    async function handler(){
        try{
        const response = await fetch("http://localhost:5713/submissions", {
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token")
            }});
        const temp= await response.json();
        setHistory(temp);
        }
        catch {console.log("error")}
    }

    useEffect(()=>{handler()}, []);
    //console.log(history);
    return (
    <div className="max-w-5xl mx-auto p-6">

    <h1 className="text-2xl font-bold mb-6">
        Submissions History
    </h1>

    <div className="space-y-3">

        {history.map((submission) => (
            <div
                key={submission._id}
                className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
            >

                {/* LEFT SIDE */}
                <div>
                    <div className="font-semibold text-lg">
                        {submission.title}
                    </div>

                    <div className="text-sm text-gray-600 flex gap-4 mt-1">
                        <span>{submission.language}</span>

                        <span>
                            {submission.passed} / {submission.total}
                        </span>

                        <span className="text-xs text-gray-400">
                            {new Date(submission.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">

                    <span
                        className={
                            submission.verdict === "Accepted"
                                ? "text-green-600 font-bold"
                                : "text-red-600 font-bold"
                        }
                    >
                        {submission.verdict}
                    </span>

                    <Link
                        to={`/submissions/${submission._id}`}
                        className="text-blue-500 underline"
                    >
                        View
                    </Link>
                </div>

            </div>
        ))}

    </div>
</div>
);
}