import { useParams } from "react-router-dom"
import { useState } from "react";

export default function Problem(){
    const [code, setCode] = useState("");
    const {id} = useParams();
    const [exec, setExec]=useState("");
    const problems = [{
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        statement: "Given an array and a target number find the two indices whose sum is equal to target",
        testcases : [
            {
                input : "4 9 2 7 11 15",
                output : "1 2"
            },
            {
                input : "5 3 4 2 1 5",
                output : "2 3"
            }
        ]
    },
    {   
        id: 2,
        title: "Reverse Array",
        difficulty: "Easy",
        statement: "Reverse the given array, 1st line contains number of elements n, following n lines contains elements",
        testcases : [
            {
                input : "4 2 7 11 15",
                output : "15 11 7 2"
            },
            {
                input : "5 3 4 2 1 5",
                output : "5 1 2 4 3"
            }
        ]
    }
    ]

    const selectedProblem=problems.find((problem)=>{
        return problem.id== id
    });

    const safeDecode = (val) => {
        try {
            return val ? atob(val) : "";
        } catch (e) {
            return val;
        }
    };

   let output = null;

    const expected = selectedProblem?.expectedOutput || "";
    const testcases = selectedProblem.testcases;

    if (exec?.stdout) {
        const userOutput = safeDecode(exec.stdout).trim();
        const expectedOutput = expected.trim();

        if (userOutput === expectedOutput) {
            output = (
                <div style={{ color: "green" }}>
                    Accepted ✔
                    <br />
                    Output: {userOutput}
                </div>
            );
        } 
        else {
            output = (
                <div style={{ color: "red" }}>
                    Wrong Answer ❌
                    <br />
                    Your Output: {userOutput}
                    <br />
                    Expected: {expectedOutput}
                </div>
            );
        }
    } 
    else {
        output = (
            <div style={{ color: "red" }}>
                Error (no output returned)
            </div>
        );
    }

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
                onClick={async () => {
                    console.log("submit clicked")
                    const problemId = id;
                    const language = "cpp";
                    const submission = {
                        problemId,
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
                                "Content-Type": "application/json"
                            }
                        }
                    );

                    const result = await response.json();
                    const token = result.token;

                    let status = "Processing";
                    let codeResult;

                    while (status === "Processing") {

                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        );

                        const judge = await fetch(
                            `http://localhost:5713/submission/${token}`
                        );

                        codeResult = await judge.json();

                        if (!codeResult.status) {
                            setExec("Invalid code");
                            return;
                        }
                    status = codeResult.status.description;
                    }
                    setExec(codeResult);
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


   // if (!exec) {
    //     output = <div>Processing...</div>;
    // }

    // else if (exec?.stdout) {
    //     output = (
    //         <div style={{ color: "green" }}>
    //             Accepted ✔
    //             <br />
    //             Output: {safeDecode(exec.stdout)}
    //         </div>
    //     );
    // }

    // else {
    //     output = (
    //         <div style={{ color: "red" }}>
    //             Error
    //         </div>
    //     );
    // }