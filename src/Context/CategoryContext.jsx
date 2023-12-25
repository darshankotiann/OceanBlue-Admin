"use client"
const { createContext, useContext, useEffect, useState } = require("react");
import axios from "axios";


export const CategoryContext = createContext();


const CatgoryProvider = ({ children }) => {
    const [categories, setCategories] = useState();
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/`)
            .then((response) => {
                setCategories(response.data.category)
            }).catch((error) => { console.log(error) })
    }, [])

    return (<CategoryContext.Provider value={{ categories }}>{children}</CategoryContext.Provider>)
}

const useCategoryContext = () => {
    return useContext(CategoryContext);
}

export { useCategoryContext, CatgoryProvider }