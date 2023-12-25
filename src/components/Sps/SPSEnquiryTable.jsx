
import { useState } from "react"
import EnquiryViewModal from "../Modals/EnquiryViewModal"
import { useSpsServiceRequestContext } from "@/Context/SpsRequestContext";
import SPSEnquiryViewModal from "../Modals/SPSModal";

const SPSEnquiryTable = () => {
    const { spsServiceRequests } = useSpsServiceRequestContext();
    console.log(spsServiceRequests)
    const [showModal, setShowModal] = useState({ show: false, data: undefined })
    return (
        <>
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
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {spsServiceRequests?.map((spsServiceRequest) => {
                            return (
                                <tr key={spsServiceRequest._id} class="bg-white border-b rounded-lg">
                                    <td class="px-6 py-4">
                                        {spsServiceRequest?.vendorID?.fullname}
                                    </td>
                                    <td class="px-6 py-4">
                                        {spsServiceRequest?.vendorID?.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {spsServiceRequest?.vendorID?.phoneNo}
                                    </td>
                                    <td class="px-6 py-4">
                                        <button type="button" disabled className={spsServiceRequest?.completed ? "flex justify-center bg-green-200 text-green-800 font-medium rounded-xl text-xs px-5 py-2.5 " : "flex justify-center text-red-800 bg-red-200 font-medium rounded-xl text-xs px-5 py-2.5"}>
                                            {spsServiceRequest?.completed ? "Resolved" : "Pending"}
                                        </button>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className="flex">
                                            <svg onClick={() => setShowModal({ show: true, data: spsServiceRequest })} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <SPSEnquiryViewModal showModal={showModal} setShowModal={setShowModal} />
        </>)
}
export default SPSEnquiryTable