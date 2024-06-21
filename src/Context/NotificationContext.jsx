"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
const { createContext, useContext } = require("react");

export const NotificationContext = createContext();
const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState()
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/notification/`)
            .then((res) => {
                setNotifications(res.data.notifications)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationContext.Provider>
    )
}
const useNotificationContext = () => {
    return useContext(NotificationContext)
}


export { useNotificationContext, NotificationProvider }