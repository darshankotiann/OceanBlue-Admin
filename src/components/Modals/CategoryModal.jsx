"use client"
import { useState, useEffect } from "react"
import UploadComponent from "../UploadComponent"
import axios from "axios"
import { useAuthContext } from "@/Context/AuthContext"
const CategoryModal = ({ showModal, setShowModal }) => {
    const { adminToken } = useAuthContext();

    // const initialData = {
    //     name: "",
    //     brand: ""
    // }
    // const [categoryData, setCategoryData] = useState(initialData)
    const [image, setImage] = useState("")
    const [data, setData] = useState();
    useEffect(() => {
        if (showModal?.update && showModal?.data) {
            setData(showModal?.data)
            setImage(showModal?.data?.image)
        }
    }, [showModal])
    const headers = {
        'authorization': `Bearer ${adminToken}`
    }

    const handleCategory = (e) => {
        e.preventDefault();
        if (showModal.update && showModal.data) {
            axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${data._id}`, { ...data, image: image }, { headers: headers })
                .then((res) => {
                    console.log("Category is Updated Successfully", res)
                    setShowModal({ show: false, update: false, data: undefined })
                window.location.reload();

                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/category/add`, { ...data, image: image }, { headers: headers })
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
                            <h1 className=" text-lg font-bold text-gray-700">{showModal.update ? "Edit Category" : "Add Category"}</h1>
                            <p>{showModal.update ? "Edit your category and necessary information from here" : "Add your category and necessary information from here"}</p>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <div onClick={() => setShowModal({ show: false, update: false, data: undefined })} className="flex items-center justify-center p-3 shadow-md rounded-full h-12 w-12 text-center mr-4 text-lg text-black bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </div>
                        </div>
                    </div>
                    <form method="post" onSubmit={handleCategory}>

                        <div className="pr-4">
                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Category Name</label>
                                </div>
                                <div className="w-full">
                                    <input onChange={onChangeData} value={data?.name} type="text" name="name" class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Category Name" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Brand Name</label>
                                </div>
                                <div className="w-full">
                                    <input onChange={onChangeData} name="brand" value={data?.brand} type="text" class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Brand Name" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Product Image</label>
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
                                <button type="submit" class=" w-full flex align-middle items-center justify-center  focus:outline-none text-white bg-[#0064FF] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-28 py-5 me-2 mb-2"> {showModal.update ? "Save Category" : "Add Category"}</button>
                            </div>
                        </div>
                    </form>

                </div>
            </>
        </>
    )
}
export default CategoryModal
