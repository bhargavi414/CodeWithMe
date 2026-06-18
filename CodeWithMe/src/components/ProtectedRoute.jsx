import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
    if (user == null) {
        return <Navigate to="/login" />;
    }
    return children;
}