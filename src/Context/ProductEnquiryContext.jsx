"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";
import { useAuthContext } from "./AuthContext";

export const ProductEnquiryContext = createContext();

const ProductEnquiryProvider = ({ children }) => {
    const { adminToken } = useAuthContext();
    const [productEnquires, setProductEnquires] = useState();
    useEffect(() => {
        if (adminToken) {
            const headers = {
                'authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }

            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/product-enquiry/`,
                { headers: headers })
                .then((response) => {
                    setProductEnquires(response.data.response)
                }).catch((error) => { console.log(error) })
        }
    }, [adminToken])

    return (<ProductEnquiryContext.Provider value={{ productEnquires, setProductEnquires }}>{children}</ProductEnquiryContext.Provider>)
}

const useProductEnquiryContext = () => {
    return useContext(ProductEnquiryContext);
}

export { useProductEnquiryContext, ProductEnquiryProvider }