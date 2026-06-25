import { useState } from "react";

export default function CreateProblem() {

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [statement, setStatement] = useState("");
    const [example, setExample] = useState("");
    const [testcases, setTestcases] = useState("");

    return (
        <div className="p-6 max-w-3xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Create Problem
            </h1>

            <div className="flex flex-col gap-4">

                <input
                    className="border p-2 rounded"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="Difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                />

                <textarea
                    className="border p-2 rounded"
                    placeholder="Statement"
                    rows="5"
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                />

                <textarea
                    className="border p-2 rounded"
                    placeholder="Example"
                    rows="3"
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                />

                <textarea
                    className="border p-2 rounded"
                    rows="8"
                    placeholder={`Paste testcases as JSON

                    Example:

                    [
                    {
                        "input": "4 9 2 7 11 15",
                        "output": "1 2"
                    },
                    {
                        "input": "5 3 4 2 1 5",
                        "output": "2 3"
                    }
                    ]`}
                    value={testcases}
                    onChange={(e) => setTestcases(e.target.value)}
                />

                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={async () => {

                        const body = {
                            title,
                            difficulty,
                            statement,
                            example,
                            testcases: JSON.parse(testcases)
                        };

                        const response = await fetch(
                            "http://localhost:5713/problems/create",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    token: localStorage.getItem("token")
                                },
                                body: JSON.stringify(body)
                            }
                        );

                        const result = await response.json();

                        if (result.success) {
                            alert("Problem Created");
                        }
                        else {
                            alert("Failed");
                        }
                    }}
                >
                    Create Problem
                </button>

            </div>
        </div>
    );
}