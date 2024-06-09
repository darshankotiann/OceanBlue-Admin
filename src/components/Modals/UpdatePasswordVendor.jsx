"use client"
import { useState, useEffect } from "react"
import UploadComponent from "../UploadComponent"
import axios from "axios"
import { useAuthContext } from "@/Context/AuthContext"
const UpdatePasswordVendor = ({ showModal, setShowModal }) => {
    const { adminToken } = useAuthContext();

    const initialData = {
        fullname: "",
        email: "",
        companyName: "",
        phoneNo: "",
        password: ""

    }
    const [image, setImage] = useState("")
    const [data, setData] = useState(initialData);
    useEffect(() => {
        if (showModal?.update && showModal?.data) {
            setData(showModal?.data)
            setImage(showModal?.data?.image)
        }
    }, [showModal])
    console.log(data)
    const headers = {
        'authorization': `Bearer ${adminToken}`
    }

    const handleCategory = (e) => {
        e.preventDefault();
        if (showModal.update && showModal.data) {
            axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/vendor/${data?._id}`, { ...data, image: image }, { headers: headers })
                .then((res) => {
                    console.log("Vendor is Updated Successfully", res)
                    setShowModal({ show: false, update: false, data: undefined })
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/vendor/signup`, { ...data, image: image }, { headers: headers })
                .then((res) => {
                    console.log("Data is Added Successfully", res)
                    setShowModal({ show: false, update: false, data: undefined })
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    const onChangeData = (e) => {
        setData(
            (values) => ({ ...values, [e.target.name]: e.target.value })
        )
    }
    return (
        <>
            <>
                <div className={!showModal.show ? "bg-white duration-700 w-4/5 fixed top-20 -right-full" : "bg-white h-screen w-4/5 duration-1000 fixed top-20 right-0"}>
                    <div className="bg-[#F9FAFB] p-8 w-full flex justify-end">
                        <div className="w-1/2">
                            <h1 className=" text-lg font-bold text-gray-700">{showModal.update ? "Edit Vendor" : "Add Vendors"}</h1>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <div onClick={() => setShowModal({ show: false, update: false, data: undefined })} className="flex items-center justify-center p-3 shadow-md rounded-full h-12 w-12 text-center mr-4 text-lg text-black bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </div>
                        </div>
                    </div>
                    <form method="post" className="overflow-y-auto h-[75%]" onSubmit={handleCategory}>

                        <div className="pr-4">
                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Vendor Name</label>
                                </div>
                                <div className="w-full">
                                    <input onChange={onChangeData} value={data?.fullname} type="text" name="fullname" class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Vendor Name" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Vendor Email</label>
                                </div>
                                <div className="w-full">
                                    <input onChange={onChangeData} value={data?.email} type="text" name="email" class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Vendor Email" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Company Name</label>
                                </div>
                                <div className="w-full">
                                    <input onChange={onChangeData} value={data?.companyName} type="text" name="companyName" class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Company Name" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Phone Number</label>
                                </div>
                                <div className="w-full">
                                    <input onChange={onChangeData} value={data?.phoneNo} type="text" name="phoneNo" class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Phone Number" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Password</label>
                                </div>
                                <div className="w-full">
                                    <input onChange={onChangeData} name="password" value={data?.password} type="text" class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Create Password"  />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Vendor Profile</label>
                                </div>
                                <div className="w-full">
                                    <div class="flex items-center justify-center w-full">
                                        <UploadComponent image={image} setImage={setImage} updateModal={showModal.update} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white p-8 w-full flex justify-end">
                            <div className="w-1/2 mr-5">
                                <button onClick={() => setShowModal({ show: false, update: false, data: undefined })} type="button" className="w-full flex align-middle items-center  focus:outline-none text-[#0064FF] justify-center focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-28 py-5 me-2 mb-2 border"> Close</button>
                            </div>
                            <div className="w-1/2 flex justify-end">
                                <button type="submit" class=" w-full flex align-middle items-center justify-center  focus:outline-none text-white bg-[#0064FF] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-28 py-5 me-2 mb-2"> {showModal.update ? "Save Vendor" : "Add Vendor"}</button>
                            </div>
                        </div>
                    </form>

                </div>
            </>
        </>
    )
}
export default UpdatePasswordVendor
