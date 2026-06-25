import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
    if (localStorage.getItem("token") == null) {
        return <Navigate to="/login" />;
    }
    return children;
}