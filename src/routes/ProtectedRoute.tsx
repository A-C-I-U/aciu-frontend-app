// import { useState } from "react";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
//     // retrieve isAuthenticated or user from context instead
//     const [ isAuthenticated ] = useState(false);

//     return isAuthenticated ? children : <Navigate to="/login" replace />
// }


import { getAuthToken, getRefreshToken } from "@/services";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
    // Check if both access token and refresh token exist
    const accessToken = getAuthToken();
    const refreshToken = getRefreshToken();
    
    const isAuthenticated = !!(accessToken && refreshToken);

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}