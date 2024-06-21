"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";
import { useAuthContext } from "./AuthContext";

export const ResaleServiceRequestContext = createContext();

const ResaleServiceRequestProvider = ({ children }) => {
    const { adminToken } = useAuthContext();
    const [resaleServiceRequests, setResaleServiceRequests] = useState();
    useEffect(() => {
        if (adminToken) {
            const headers = {
                'authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/scrap/`,
                { headers: headers })
                .then((response) => {
                    setResaleServiceRequests(response.data.response)
                }).catch((error) => { console.log(error) })
        }
    }, [adminToken])
    return (<ResaleServiceRequestContext.Provider value={{ resaleServiceRequests, setResaleServiceRequests }}>{children}</ResaleServiceRequestContext.Provider>)
}

const useResaleServiceRequestContext = () => {
    return useContext(ResaleServiceRequestContext);
}

export { useResaleServiceRequestContext, ResaleServiceRequestProvider }