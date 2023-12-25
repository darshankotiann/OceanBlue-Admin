"use client"
import { useAuthContext } from '@/Context/AuthContext'
import Login from '@/components/Login';
import Layout from '@/components/Layout/Layout';
import ServiceEnquiryTable from '@/components/ServiceRequest/ServiceEnquiryTable';

const ServiceRequest = () => {
    const { adminToken } = useAuthContext();
    return (
        <>
            {
                adminToken ? <Layout>
              
                    <ServiceEnquiryTable  />
                </Layout> : <Login />
            }

        </>
    )
}
export default ServiceRequest