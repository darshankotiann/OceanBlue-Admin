"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";
import { useAuthContext } from "./AuthContext";

export const EmergencyRequestContext = createContext();

const EmergencyServiceRequestProvider = ({ children }) => {
    const { adminToken } = useAuthContext();
    const [EmergencyserviceRequests, setEmergencyServiceRequests] = useState();
    useEffect(() => {
        if (adminToken) {
            const headers = {
                'authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/emergency/`,
                { headers: headers })
                .then((response) => {
                    console.log(response.data)
                    setEmergencyServiceRequests(response.data.response)
                }).catch((error) => { console.log(error) })
        }
    }, [adminToken])
    return (<EmergencyRequestContext.Provider value={{ EmergencyserviceRequests, setEmergencyServiceRequests }}>{children}</EmergencyRequestContext.Provider>)
}

const useEmergencyRequestContext = () => {
    return useContext(EmergencyRequestContext);
}

export { useEmergencyRequestContext, EmergencyServiceRequestProvider }