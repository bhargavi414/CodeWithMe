import {Link} from "react-router-dom"
import { Children, useState } from "react";
import { useEffect } from "react";

export default function Submissions () {
    const [history, setHistory]=useState([]);
    async function handler(){
        try{
        const response = await fetch("http://localhost:5713/submissions", {method : "GET"});
        const temp= await response.json();
        setHistory(temp);
        }
        catch {console.log("error")}
    }

    useEffect(()=>{handler()}, []);

    return (
    <div className="bg-white p-4">
        <div className="font-bold mb-3 flex justify-between border-b pb-2">
            <span>Problem ID</span>
            <span>Language</span>
            <span>Action</span>
        </div>

        {history.map((element) => {
            return (
                <div
                    key={element.problemId}
                    className="flex justify-between py-2 border-b"
                >
                    <span>{element.problemId}</span>
                    <span>{element.language}</span>
                    <Link
                        to={`/submissions/${element.problemId}`}
                        className="text-blue-500 underline"
                    >
                        View Code
                    </Link>
                </div>
            );
        })}
    </div>
);
}