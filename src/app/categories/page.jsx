"use client"
import Image from 'next/image'
import Layout from '@/components/Layout/Layout'
import { useState } from 'react'
import Login from '@/components/Login'
import CategoryModal from '@/components/Modals/CategoryModal'
import { useAuthContext } from '@/Context/AuthContext'
import CategoryTable from '@/components/Category/CategoryTable'
const Category = () => {
    const { adminToken } = useAuthContext();
    const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
    const [isuserLogin, setISUserLogin] = useState({ show: false, token: undefined });

    return (
        <>
            {
                adminToken ? <Layout>
             
                    <CategoryTable showModal={showModal} setShowModal={setShowModal} />
                    <CategoryModal showModal={showModal} setShowModal={setShowModal} />
                </Layout> : <Login />
            }

        </>
    )
}
export default Category