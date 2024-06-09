import { useState, useEffect } from "react"

import CategoryModal from "../Modals/CategoryModal"
import { useVendorContext } from "@/Context/VendorContext";
import VendorModal from "../Modals/VendorModal";
import axios from "axios";
const VendorTable = ({ showModal, setShowModal }) => {
    const { vendorData } = useVendorContext();
    const [passwordModal, setPasswordModal] = useState("")
    const [searchResult, setSearchResult] = useState([]);
    const [password, setPassword] = useState("")
    const [confPass, setConfPass] = useState("")

    useEffect(() => {
        setSearchResult(vendorData)
    }, [vendorData])

    const handleFilter = (e) => {
        if (e.target.value.length == 0) {
            setSearchResult(vendorData)
            return
        }
        setSearchResult(vendorData.filter((data) => {
            return data?.fullname?.toLowerCase()?.includes(e.target.value.toLowerCase());
        }))
    }

    const updatePassword = (e) => {
        e.preventDefault()
        if (confPass == password) {
            axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/vendor/password/${passwordModal}`, {
                password
            })
                .then((res) => {
                    window.location.reload()
                })
                .catch((err) => {
                    alert("Something went wrong")
                })
        } else {
            alert("Password doesn't match")
        }
    }

    return (
        <>
            <div className="p-10">
                <h2 className="text-2xl font-bold">Manage Vendor</h2>
            </div>

            <div className="px-10 mb-4 gap-3 w-full grid grid-cols-12">
                <input onChange={handleFilter} type="email" id="email" class="col-span-8 bg-gray-50 text-gray-900 text-sm rounded-lg block  px-5 py-3 border-2 " placeholder="Search Product" />
                <button type="button" onClick={() => setShowModal({ show: true, update: false, data: undefined })} class="  flex justify-center items-center col-span-4 text-white bg-[#0064FF] hover:bg-[#0064FF]  font-medium rounded-lg text-sm px-10 py-3"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" mr-2 lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Add Vendor
                </button>
            </div>
            <div class="relative px-10 overflow-x-auto h-[75vh]">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0  ">
                        <tr >

                            <th scope="col" class="px-6 py-3">
                                Vendor Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vendor name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vendor email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vendor PhoneNo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vendor Comapany
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult?.map((vendor) => {
                            return (
                                <tr key={vendor._id} class="bg-white border-b rounded-lg">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <img className="w-20 h-20 rounded-lg" src={vendor.image} />
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {vendor?.fullname}
                                    </th>
                                    <td class="px-6 py-4">
                                        {vendor?.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {vendor?.phoneNo}
                                    </td>
                                    <td class="px-6 py-4">
                                        {vendor?.companyName}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className="flex gap-3">
                                            <div className="">
                                                <svg onClick={() => setShowModal({ show: true, update: true, data: vendor })} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-edit"><path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" /><polyline points="14 2 14 8 20 8" /><path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" /></svg>
                                            </div>
                                            <div className="flex">
                                                <svg onClick={() => setPasswordModal(vendor._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key-round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <VendorModal showModal={showModal} setShowModal={setShowModal} />
            {passwordModal && <main className="flex items-center justify-center h-screen w-screen bg-black/50 z-[100] absolute top-0 left-0">
                <form onSubmit={updatePassword} className="flex flex-col p-10 rounded-xl bg-white w-[40vw]">
                    <h2 className="text-2xl font-bold mb-3">Update Password</h2>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" name="password" class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Password" required />
                    <input onChange={(e) => setConfPass(e.target.value)} value={confPass} type="text" name="password" class="mt-3 w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Confirm Password" required />
                    <button type="submit" className="mt-4 w-full text-white bg-[#0064FF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                </form>
            </main>}
        </>
    )
}

export default VendorTable
