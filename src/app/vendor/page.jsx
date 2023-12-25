"use client"
import React, { useState } from 'react';
import { useAuthContext } from '@/Context/AuthContext'
import Login from '@/components/Login';
import Layout from '@/components/Layout/Layout';
import VendorTable from '@/components/Vendor/VendorTable';

const Vendor = () => {
    const { adminToken } = useAuthContext();
    const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });

    return (
        <>
            {
                adminToken ? <Layout>
        
                    <VendorTable showModal={showModal} setShowModal={setShowModal} />
                </Layout> : <Login />
            }

        </>
    )
}
export default Vendor