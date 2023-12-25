import { useState, useEffect } from "react"
import axios from "axios";
import { useAuthContext } from "@/Context/AuthContext"

const SPSViewModal = ({ setShowModal, showModal }) => {
    const { adminToken } = useAuthContext();
    console.log(adminToken)
    const updateStatus = (e) => {
        e.preventDefault();
        console.log(showModal.data._id)
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
        }
        let reqOptions = {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/sps/${showModal?.data?._id}`,
            method: "PATCH",
            headers: headersList,
        }
        axios.request(reqOptions)
            .then((res) => {
                alert("Enquiry Closed Successfully!");
                setShowModal({ show: false, data: undefined })
                window.location.reload();
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class={showModal.show ? "overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" : "hidden"}>
            <div class="relative p-4 w-full max-w-2xl max-h-full top-[5%] left-[35%] ">
                <div class="relative bg-white rounded-lg shadow ">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 class="text-xl font-semibold text-gray-900 ">
                            Enquiry Information
                        </h3>
                        <button onClick={() => setShowModal({ show: false, data: undefined })} type="button" class="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="static-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-4 md:p-5 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="w-full flex flex-col gap-2">
                            <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Vendor Name</label>
                            <input value={showModal?.data?.vendorID?.fullname} readOnly class="w-full bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Vendor Email</label>
                            <input value={showModal?.data?.vendorID?.email} readOnly class="w-full bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Vendor PhoneNo</label>
                            <input value={showModal?.data?.vendorID?.phoneNo} readOnly class="w-full bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Company Name</label>
                            <input value={showModal?.data?.vendorID?.companyName} readOnly class="w-full bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " />
                        </div>
                       
                        <div className="w-full flex flex-col gap-2 col-span-2">
                            <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Enquiry Message</label>
                            <textarea value={showModal?.data?.message} readOnly class="w-full bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 "></textarea>
                        </div>
                        <button type="button" disabled={showModal?.data?.completed} onClick={updateStatus} className="disabled:bg-[#4D70B6] col-span-2 text-center flex justify-center focus:outline-none text-white bg-[#0064FF] hover:bg-[#4D70B6] focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            {showModal?.data?.completed ? "Enquiry Closed" : "Close Enquiry"}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SPSViewModal