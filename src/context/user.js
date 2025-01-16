import { Layout } from "layout";
import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "utility";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const setData = () => {
        const authenticated = AuthService.isAuthenticated();
        setIsAuthenticated(authenticated);
        if (authenticated) {
            const user = AuthService.getUser();
            setUser(user);
        }
    };

    const loadToken = async () => {
        setData();
        setLoading(false);
    };

    useEffect(() => {
        loadToken();
    }, []);

    const login = (data) => {
        AuthService.storeToken(data.token || "as");
        AuthService.storeUser(data);
        setUser(data);
        setIsAuthenticated(true);
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
    };

    const contextData = useMemo(
        () => ({
            loading,
            user,
            isAuthenticated,
            login,
            logout,
        }),
        [loading, user, isAuthenticated, login, logout]
    );

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ redirectPath = "/login", children }) => {
    const { isAuthenticated, loading } = useAuth();
    console.log("🚀 ~ file: user.js:61 ~ ProtectRoute ~ isAuthenticated:", isAuthenticated);
    
    // Bypass authentication check in development mode
    if (process.env.NODE_ENV === 'development') {
        return <Layout>{children}</Layout>;
    }

    if (loading) {
        return;
    }
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Layout>{children}</Layout>;
};