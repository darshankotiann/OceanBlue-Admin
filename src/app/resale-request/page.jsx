"use client"
import { useAuthContext } from '@/Context/AuthContext'
import Login from '@/components/Login';
import Layout from '@/components/Layout/Layout';
import ResaleEnquiry from '@/components/ResaleEnquiry/ResaleEnquiryTable';

const ResaleServiceRequest = () => {
    const { adminToken } = useAuthContext();
    return (
        <>
            {
                adminToken ? <Layout>
            
                    <ResaleEnquiry  />
                </Layout> : <Login />
            }

        </>
    )
}
export default ResaleServiceRequest