import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
    // retrieve isAuthenticated or user from context instead
    const [ isAuthenticated ] = useState(true);

    return isAuthenticated ? children : <Navigate to="/login" replace />
}