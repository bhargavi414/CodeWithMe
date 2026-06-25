import {Link} from "react-router-dom"

export default function Navbar(){
    return (
    <nav className="bg-white shadow-md px-6 py-4">

        <div className="max-w-6xl mx-auto flex items-center justify-between">

            {/* Logo / Brand */}
            <div className="text-2xl font-bold text-blue-600">
                CodeWithMe
            </div>

            {/* Navigation Links */}
            <div className="flex gap-6 font-medium">

                <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 transition"
                >
                    Home
                </Link>

                <Link
                    to="/problems"
                    className="text-gray-700 hover:text-blue-600 transition"
                >
                    Problems
                </Link>

                <Link
                    to="/submissions"
                    className="text-gray-700 hover:text-blue-600 transition"
                >
                    Submissions
                </Link>

            </div>

        </div>

    </nav>
);
}