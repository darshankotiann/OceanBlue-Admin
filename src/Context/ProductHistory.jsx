"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";
import { useAuthContext } from "./AuthContext";

export const ProductHistoryContext = createContext();

const ProductHistoryProvider = ({ children }) => {
    const { adminToken } = useAuthContext();
    const [productHistory, setProductHistory] = useState();
    useEffect(() => {
        if (adminToken) {
            const headers = {
                'authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }

            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/order/all`,
                { headers: headers })
                .then((response) => {
                    setProductHistory(response.data.response)
                }).catch((error) => { console.log(error) })
        }
    }, [adminToken])

    return (<ProductHistoryContext.Provider value={{ productHistory, setProductHistory }}>{children}</ProductHistoryContext.Provider>)
}

const useProductHistoryContext = () => {
    return useContext(ProductHistoryContext);
}

export { useProductHistoryContext, ProductHistoryProvider }