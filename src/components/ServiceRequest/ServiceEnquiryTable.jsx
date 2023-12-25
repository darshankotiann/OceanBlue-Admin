
import { useState,useEffect } from "react"
import ServiceEnquiryViewModal from "../Modals/ServiceEnquiryModal";
import { useServiceRequestContext } from "@/Context/ServiceRequestContext";
import EmergencyEnquiry from "../EmergencyEnquiry/EmergencyEnquiryTable";

const ServiceEnquiryTable = ({ }) => {
    const { serviceRequests } = useServiceRequestContext();
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setSearchResult(serviceRequests)
    }, [serviceRequests])

    const handleFilter = (e) => {
        if (e.target.value.length == 0) {
            setSearchResult(serviceRequests)
            return
        }
        setSearchResult(serviceRequests.filter((data) => {
            return data?.vendorID?.fullname?.toLowerCase()?.includes(e.target.value.toLowerCase());
        }))
    }

    const [showModal, setShowModal] = useState({ show: false, data: undefined })
    return (
        <>
            <div className="p-10">
                <h2 className="text-2xl font-bold">Manage Service Enquiry</h2>
            </div>
            <div className="mb-4 px-10 flex justify-around w-full">
                <input onChange={handleFilter} type="email" id="email" class="w-full py-3 bg-gray-50 text-gray-900 text-sm rounded-lg block  p-2 border-2 " placeholder="Search Product" required />
            </div>
            <div class="relative px-10 overflow-x-auto h-[75vh]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 ">
                        <tr >
                            <th scope="col" class="px-6 py-3">
                                Vendor Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vendor Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vendor Phoneno
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product Enquired
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult?.map((serviceRequest) => {
                            return (
                                <tr key={serviceRequest._id} class="bg-white border-b rounded-lg">
                                    <td class="px-6 py-4">
                                        {serviceRequest?.vendorID?.fullname}
                                    </td>
                                    <td class="px-6 py-4">
                                        {serviceRequest?.vendorID?.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {serviceRequest?.vendorID?.phoneNo}
                                    </td>

                                    <td>
                                        {serviceRequest?.orderID?.productID?.name}
                                    </td>
                                    <td class="px-6 py-4">
                                        <button type="button" disabled className={serviceRequest?.completed ? "flex justify-center bg-green-200 text-green-800 font-medium rounded-xl text-xs px-5 py-2.5 " : "flex justify-center text-red-800 bg-red-200 font-medium rounded-xl text-xs px-5 py-2.5"}>
                                            {serviceRequest?.completed ? "Resolved" : "Pending"}
                                        </button>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className="flex">
                                            <svg onClick={() => setShowModal({ show: true, data: serviceRequest })} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ServiceEnquiryViewModal showModal={showModal} setShowModal={setShowModal} />
        </>)
}
export default ServiceEnquiryTable