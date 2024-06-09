"use client"
import Image from 'next/image'
import Layout from '@/components/Layout/Layout'
import { useState } from 'react'
import Login from '@/components/Login'
import { useAuthContext } from '@/Context/AuthContext'
import GalleryTable from '@/components/Gallery/GalleryTable'
const Gallery = () => {
    const { adminToken } = useAuthContext();
    const [showModal, setShowModal] = useState(false);
    const [isuserLogin, setISUserLogin] = useState({ show: false, token: undefined });

    return (
        <>
            {
                adminToken ? <Layout>
                    <GalleryTable showModal={showModal} setShowModal={setShowModal} />
                </Layout> : <Login />
            }

        </>
    )
}
export default Gallery