import { useParams } from "react-router-dom"
import { useState } from "react";

export default function Problem(){
    const [code, setCode] = useState("");
    const {id} = useParams();
    const problems = [{
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        statement: "Given an array and a target number find the two indices whose sum is equal to target",
        example: "nums=[2,7,11,15]"
    },
    {   
        id: 2,
        title: "Reverse Linked List",
        difficulty: "Easy",
        statement: "Reverse the given linked list",
        example: "[1,2,3,4]"
    }
    ]

    const selectedProblem=problems.find((problem)=>{
        return problem.id== id
    });
    return(
        <div style={{ padding: "20px" }}>
            
            <h1 style={{ marginBottom: "10px" , fontWeight: "bold"}}>
            {selectedProblem.title} | {selectedProblem.difficulty}
            </h1>

            
            <p style={{ marginBottom: "20px" }}>
            {selectedProblem.statement}
            </p>

            <h3>Example</h3>
            <pre style={{ padding: "10px", background: "#f5f5f5" }}>
            {selectedProblem.example}
            </pre>

            <textarea
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />

            <button
            onClick={()=>{
                const problemId=id;
                const language ="cpp";
                const submission = {problemId, code, language};
                async function handler(){
                    const response = await fetch(
                        "http://localhost:5713/submit",
                        {   method : "POST",
                            body : JSON.stringify(submission),
                            headers : {
                                "Content-Type": "application/json"
                            }
                        }
                    )
                    const result = await response.json();
                    console.log(result.success);
                }
                handler();

            }}
            style={{marginTop: "20px"}}
            className="bg-gray-500 font-bold  p-1 rounded-lg">
                Submit
            </button>
        </div>
    )
}