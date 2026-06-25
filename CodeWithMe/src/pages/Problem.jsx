import { useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";

export default function Problem(){
    const [code, setCode] = useState("");
    const {id} = useParams();
    const [exec, setExec] = useState({});
    const [problem, setProblem] = useState({});

    useEffect(() => {

        async function fetchProblem() {
            const response = await fetch(
                `http://localhost:5713/problem/${id}`,
                {
                    method : "GET"
                }
            );
            const result = await response.json();
            setProblem(result);
        }

        fetchProblem();

    }, [id]);

    if (!problem._id) {
        return <div>Loading...</div>;
    }   

    const testcases = problem.testcases;
    let output = null;

    if (exec?.verdict) {

    output = (
        <div>
            <h3
                style={{
                    color: exec.verdict === "Accepted" ? "green" : "red"
                }}
            >
                {exec.verdict === "Accepted"
                    ? "Accepted ✔"
                    : "Wrong Answer ❌"}
            </h3>

            {exec.results.map((result, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid gray",
                        margin: "10px 0",
                        padding: "10px"
                    }}
                >
                    <div>Test Case {index + 1}</div>
                    <div>Input: {result.input}</div>
                    <div>Your Output: {result.got}</div>
                    <div>Expected Output: {result.expected}</div>
                    <div>
                        Status:{" "}
                        <span
                            style={{
                                color:
                                    result.status === "passed"
                                        ? "green"
                                        : "red"
                            }}
                        >
                            {result.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

    return(
        <div style={{ padding: "20px" }}>
            
            <h1 style={{ marginBottom: "10px" , fontWeight: "bold"}}>
            {problem.title} | {problem.difficulty}
            </h1>

            
            <p style={{ marginBottom: "20px" }}>
            {problem.statement}
            </p>

            <h3>Example</h3>
            <pre style={{ padding: "10px", background: "#f5f5f5" }}>
            {problem.example}
            </pre>

            <textarea 
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />

            <button
                onClick={async () => {
                    console.log("submit clicked")
                    const title = problem.title;
                    const language = "cpp";
                    const submission = {
                        title,
                        code,
                        language,
                        testcases
                    };


                    const response = await fetch(
                        "http://localhost:5713/submit",
                        {
                            method: "POST",
                            body: JSON.stringify(submission),
                            headers: {
                                "Content-Type": "application/json",
                                "token" : localStorage.getItem("token")
                            }
                        }
                    );

                    const result = await response.json();
                    setExec(result);
                    
                }}

                style={{ marginTop: "20px" }}
                className="bg-gray-500 font-bold p-1 rounded-lg"
                >
                    Submit
            </button>
            <div>{output}</div>
        </div>
    )
}
