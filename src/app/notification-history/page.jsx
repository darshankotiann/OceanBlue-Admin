"use client"
import Login from '@/components/Login';
import Layout from '@/components/Layout/Layout';
import { useNotificationContext } from '@/Context/NotificationContext';
import { useAuthContext } from '@/Context/AuthContext';
import moment from 'moment';

const NotificationHistory = () => {
    const { notifications } = useNotificationContext()
    const { adminToken } = useAuthContext()
    return (
        <>
            {
                adminToken ? <Layout>
                    <div className="p-10">
                        <h2 className="text-2xl font-bold">Notification History</h2>
                    </div>
                    <div class="relative px-10 overflow-x-auto h-[75vh]">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 ">
                                <tr >
                                    <th scope="col" class="px-6 py-3">
                                        Token Number
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Type / Category
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Users
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Timestamp
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {notifications?.map((notification) => {
                                    return (
                                        <tr key={notification._id} class="bg-white border-b rounded-lg">
                                            <td class="px-6 py-4">
                                                #{notification?._id.slice(18)}
                                            </td>
                                            <td class="px-6 py-4">
                                                {notification?.title}
                                            </td>
                                            <td class="px-6 py-4">
                                                {notification?.body?.slice(0, 10)}...
                                            </td>
                                            <td class="px-6 py-4">
                                                {notification?.type == "" ? "all" : notification?.type}
                                            </td>
                                            <td class="px-6 py-4">
                                                {notification?.vendorID?.length}
                                            </td>
                                            <td class="px-6 py-4">
                                                {moment(notification?.timestamp).format("MMMM Do YYYY, h:mm a")}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Layout> : <Login />
            }

        </>
    )
}
export default NotificationHistory