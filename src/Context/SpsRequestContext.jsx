"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";
import { useAuthContext } from "./AuthContext";

export const SpsServiceRequestContext = createContext();

const SpsServiceRequestProvider = ({ children }) => {
    const { adminToken } = useAuthContext();
    const [spsServiceRequests, setSpsServiceRequests] = useState();
    useEffect(() => {
        if (adminToken) {
            const headers = {
                'authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sps/`,
                { headers: headers })
                .then((response) => {
                    setSpsServiceRequests(response.data.response)
                }).catch((error) => { console.log(error) })
        }
    }, [adminToken])
    return (<SpsServiceRequestContext.Provider value={{ spsServiceRequests, setSpsServiceRequests }}>{children}</SpsServiceRequestContext.Provider>)
}

const useSpsServiceRequestContext = () => {
    return useContext(SpsServiceRequestContext);
}

export { useSpsServiceRequestContext, SpsServiceRequestProvider }