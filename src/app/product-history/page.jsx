"use client"
import { useAuthContext } from '@/Context/AuthContext'
import Login from '@/components/Login';
import Layout from '@/components/Layout/Layout';
import ProducHistoryTable from '@/components/ProductHistory/ProductHistory';

const ProductHistory = () => {
    const { adminToken } = useAuthContext();
    return (
        <>
            {
                adminToken ? <Layout>
              
                    <ProducHistoryTable />
                </Layout> : <Login />
            }

        </>
    )
}
export default ProductHistory