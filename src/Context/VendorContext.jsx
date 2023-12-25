"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";
import { useAuthContext } from "./AuthContext";

export const VendorContext = createContext();

const VendorProvider = ({ children }) => {
    const { adminToken } = useAuthContext();
    const [vendorData, setVendorData] = useState();
    useEffect(() => {
        if (adminToken) {
            const headers = {
                'authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }

            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/vendor/get`,
                { headers: headers })
                .then((response) => {
                    console.log(response.data)
                    setVendorData(response.data.response)
                }).catch((error) => { console.log(error) })
        }
    }, [adminToken])

    return (<VendorContext.Provider value={{ vendorData, setVendorData }}>{children}</VendorContext.Provider>)
}

const useVendorContext = () => {
    return useContext(VendorContext);
}

export { useVendorContext, VendorProvider }