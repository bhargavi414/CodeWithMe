import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
            <h1 className="text-3xl font-bold text-center mb-6">
                Create Account
            </h1>

            <div className="mb-4">
                <label className="block mb-2 font-medium">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border w-full p-2 rounded"
                    placeholder="Enter your email"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-medium">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border w-full p-2 rounded"
                    placeholder="Enter your password"
                />
            </div>

            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}

            <button
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={async () => {
                    try {
                        const response = await fetch(
                            "http://localhost:5713/signup",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    email,
                                    password
                                })
                            }
                        );

                        const resp = await response.json();

                        if (resp.success) {
                            navigate("/login");
                        } else {
                            setError(resp.error);
                        }
                    } catch {
                        setError("Could not connect to server");
                    }
                }}
            >
                Create Account
            </button>

            <div className="text-center mt-4">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-500 underline"
                >
                    Login
                </Link>
            </div>
        </div>
    </div>
);
}
