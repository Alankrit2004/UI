import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from "./pages/Login.page";
import { Admin } from "./pages/Admin.page";
import { NotFound } from "./pages/NotFound.page";
import { AuthProvider, ProtectRoute } from "context";
import { ThemeProvider } from "styled-components";
import { theme } from "layout";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function App() {
    const themeMode = theme;
    return (
        <section className="app bg-white uppercase ">
            <PhotoProvider>
                <ThemeProvider theme={themeMode}>
                    <AuthProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Navigate to="admin" />} />
                            <Route
                                path="/admin/*"
                                element={
                                    <ProtectRoute>
                                        <Admin />
                                    </ProtectRoute>
                                }
                            />
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </AuthProvider>
                </ThemeProvider>
            </PhotoProvider>

        </section>
    );
}

export default App;
