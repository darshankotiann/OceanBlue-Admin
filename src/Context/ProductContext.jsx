"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";


export const ProductContext = createContext();


const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState();
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/`)
            .then((response) => {
                console.log(response.data.product)
                setProducts(response.data.product)
            }).catch((error) => { console.log(error) })
    }, [])

    return (<ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>)
}

const useProductContext = () => {
    return useContext(ProductContext);
}

export { useProductContext, ProductProvider }