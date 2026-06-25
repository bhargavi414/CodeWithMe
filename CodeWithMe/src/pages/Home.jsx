import {Link, useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import { useState } from "react";

export default function Home ({setUser, user}) {
    const navigate = useNavigate();

    return ( <div className="min-h-screen bg-gray-100 flex justify-center items-center"> <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
            CodeWithMe
        </h1>

        <p className="text-gray-600 mb-6">
            Welcome back
        </p>

        <div className="bg-gray-100 rounded-lg p-3 mb-6">
            <span className="font-semibold text-gray-700">
                Logged in as:
            </span>
            <div className="text-blue-600 font-medium mt-1">
                {user}
            </div>
        </div>

        <button
            onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/login");
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition"
        >
            LOGOUT
        </button>

    </div>
</div>
);

}