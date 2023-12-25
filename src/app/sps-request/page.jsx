"use client"
import { useAuthContext } from '@/Context/AuthContext'
import Login from '@/components/Login';
import Layout from '@/components/Layout/Layout';
import SPSEnquiryTable from '@/components/Sps/SPSEnquiryTable';

const SPSRequest = () => {
    const { adminToken } = useAuthContext();
    return (
        <>
            {
                adminToken ? <Layout>
                    <div className="p-10">
                        <h2 className="text-2xl font-bold">SPS</h2>
                    </div>
                    <div className="mb-4 px-10 flex justify-around w-full">
                        <input type="email" id="email" class="w-full py-3 bg-gray-50 text-gray-900 text-sm rounded-lg block  p-2 border-2 " placeholder="Search Product" required />
                    </div>
                    <SPSEnquiryTable />
                </Layout> : <Login />
            }

        </>
    )
}
export default SPSRequest