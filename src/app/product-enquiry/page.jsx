"use client"
import { useAuthContext } from '@/Context/AuthContext'
import Login from '@/components/Login';
import Layout from '@/components/Layout/Layout';
import EnquiryTable from '@/components/ProductEnquiry/EnquiryTable';

const ProductEnquiry = () => {
    const { adminToken } = useAuthContext();
    return (
        <>
            {
                adminToken ? <Layout>
                    <EnquiryTable />
                </Layout> : <Login />
            }

        </>
    )
}
export default ProductEnquiry