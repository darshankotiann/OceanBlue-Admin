"use client"
import React, { useEffect, useState } from "react";
const { createContext, useContext } = require("react");

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState({})
    useEffect(() => {
        setAdminToken(localStorage.getItem('adminToken'))
    }, [])
    return (
        <AuthContext.Provider value={{ adminToken, setAdminToken }}>{children}</AuthContext.Provider>
    )
}
const useAuthContext = () => {
    return useContext(AuthContext)
}


export { useAuthContext, AuthProvider }