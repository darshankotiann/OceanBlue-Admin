"use client"
import { useAuthContext } from '@/Context/AuthContext'
import Login from '@/components/Login';
import Layout from '@/components/Layout/Layout';
import EmergencyEnquiry from '@/components/EmergencyEnquiry/EmergencyEnquiryTable';

const EmergencyServiceRequest = () => {
    const { adminToken } = useAuthContext();
    return (
        <>
            {
                adminToken ? <Layout>
            
                    <EmergencyEnquiry  />
                </Layout> : <Login />
            }

        </>
    )
}
export default EmergencyServiceRequest