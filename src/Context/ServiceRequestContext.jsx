"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";
import { useAuthContext } from "./AuthContext";

export const ServiceRequestContext = createContext();

const ServiceRequestProvider = ({ children }) => {
    const { adminToken } = useAuthContext();
    const [serviceRequests, setServiceRequests] = useState();
    useEffect(() => {
        if (adminToken) {
            const headers = {
                'authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/bookservice/`,
                { headers: headers })
                .then((response) => {
                    console.log(response.data)
                    setServiceRequests(response.data.response)
                }).catch((error) => { console.log(error) })
        }
    }, [adminToken])
    return (<ServiceRequestContext.Provider value={{ serviceRequests, setServiceRequests }}>{children}</ServiceRequestContext.Provider>)
}

const useServiceRequestContext = () => {
    return useContext(ServiceRequestContext);
}

export { useServiceRequestContext, ServiceRequestProvider }