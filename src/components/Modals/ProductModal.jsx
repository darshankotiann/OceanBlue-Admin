import { useState, useEffect } from "react"
import axios from "axios"
import UploadComponent from "../UploadComponent"

import { useCategoryContext } from "@/Context/CategoryContext"
import { useAuthContext } from "@/Context/AuthContext"

const ProductModal = ({ showModal, setShowModal }) => {
    const { adminToken } = useAuthContext();

    const initialField = {
        name: "",
        description: "",
        price: "",
        category: ""
    }
    const [data, setData] = useState(initialField)
    const { categories } = useCategoryContext()
    const [image, setImage] = useState("")
    useEffect(() => {
        if (showModal?.update && showModal?.data) {
            setData(showModal?.data)
            setImage(showModal?.data?.image)
        }
    }, [showModal])
    const productHandle = (e) => {
        e.preventDefault();
        const headers = {
            'authorization': `Bearer ${adminToken}`
        }
        if (showModal.update && showModal.data) {
            axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${data._id}`, { ...data, image: image }, { headers: headers })
                .then((res) => {
                    setShowModal({ show: false, update: false, data: undefined })
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/add`, { ...data, image: image }, { headers: headers })
                .then((res) => {
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
                            <h1 className=" text-lg font-bold text-gray-700">{showModal.update ? "Edit Product" : "Add Products"}</h1>
                            <p>{showModal.update ? "Edit your product and necessary information from here" : "Add your product and necessary information from here"}</p>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <div onClick={() => setShowModal({ show: false, update: false, data: undefined })} className="flex items-center justify-center p-3 shadow-md rounded-full h-12 w-12 text-center mr-4 text-lg text-black bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </div>
                        </div>
                    </div>
                    <form method="post" onSubmit={productHandle}>
                        <div className="pr-4">
                            <div className="grid grid-cols-2 py-2">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Product Name</label>
                                </div>
                                <div className="w-full">
                                    <input type="text" onChange={onChangeData} name="name" value={data?.name} class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Product Name" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-2">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Product Price</label>
                                </div>
                                <div className="w-full">
                                    <input type="text" onChange={onChangeData} name="price" value={data?.price} class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Product Price" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-2">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Product Description</label>
                                </div>
                                <div className="w-full">
                                    <input type="text" onChange={onChangeData} name="description" value={data?.description} class="w-full mr-4 bg-gray-50  text-gray-900 text-sm rounded-lg block  p-4 border-2 " placeholder="Product Description" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-2">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Product Image</label>
                                </div>
                                <div className="w-full">
                                    <div class="flex items-center justify-center w-full">
                                        <UploadComponent image={image} setImage={setImage} updateModal={showModal.update} />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 ">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Select Category</label>
                                </div>
                                <div className="w-full">
                                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                    <select id="countries" onChange={onChangeData} name="category" value={data?.category._id} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-4">
                                        <option value=""></option>
                                        {categories?.map((category) => {
                                            return (
                                                <option key={category._id} name="category" value={category._id}>{category.name}</option>
                                            )
                                        })}
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 w-full flex justify-end">
                            <div className="w-1/2 mr-5">
                                <button onClick={() => setShowModal({ show: false, update: false, data: undefined })} type="button" className="w-full flex align-middle items-center  focus:outline-none text-[#0064FF] justify-center focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-28 py-5 me-2 mb-2 border"> Close</button>
                            </div>
                            <div className="w-1/2 flex justify-end">
                                <button type="submit" class=" w-full flex align-middle items-center justify-center  focus:outline-none text-white bg-[#0064FF] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-28 py-5 me-2 mb-2"> {showModal.update ? "Update Product" : "Add Product"}</button>
                            </div>
                        </div>
                    </form>

                </div>
            </>
        </>
    )
}
export default ProductModal