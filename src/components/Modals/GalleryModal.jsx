"use client"
import { useState, useEffect } from "react"
import UploadComponent from "../UploadComponent"
import axios from "axios"
import { useAuthContext } from "@/Context/AuthContext"
import UploadImgVideo from "../UploadImgVideo"
const GalleryModal = ({ showModal, setShowModal }) => {
    const { adminToken } = useAuthContext();
    const initialData = {
        name: "",
        brand: ""
    }
    const [categoryData, setCategoryData] = useState(initialData)
    const [image, setImage] = useState({ url: "", type: "" })
    const [data, setData] = useState();
    const [srcImgType, setSrcImgType] = useState()
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
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/add`,
            {
                url: image.url,
                type: image.type
            },
            { headers: headers })
            .then((res) => {
                alert("Added!!");
                setShowModal(false)
                window.location.reload();
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <>
                <div className={!showModal ? "bg-white duration-700 w-4/5 fixed top-20 -right-full" : "bg-white h-screen w-4/5 duration-1000 fixed top-20 right-0"}>
                    <div className="bg-[#F9FAFB] p-8 w-full flex justify-end">
                        <div className="w-1/2">
                            <h1 className=" text-lg font-bold text-gray-700">Add Gallery</h1>
                            <p>Add your product and necessary information from here</p>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <div onClick={() => setShowModal(false)} className="flex items-center justify-center p-3 shadow-md rounded-full h-12 w-12 text-center mr-4 text-lg text-black bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </div>
                        </div>
                    </div>

                    <form method="post" onSubmit={handleCategory}>

                        <div className="pr-4">

                            <div className="grid grid-cols-2 py-3">
                                <div className="w-full flex justify-center items-center">
                                    <label class="block w-1/2 items-center text-gray-800   font-medium text-sm">Src</label>
                                </div>
                                <div className="w-full">
                                    <div class="flex items-center justify-center w-full">
                                        <UploadImgVideo image={image} setImage={setImage} srcImgType={srcImgType} />
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="bg-white p-8 w-full flex justify-end">
                            <div className="w-1/2 mr-5">
                                <button onClick={() => setShowModal(false)} type="button" className="w-full flex align-middle items-center  focus:outline-none text-[#0064FF] justify-center focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-28 py-5 me-2 mb-2 border"> Close</button>
                            </div>
                            <div className="w-1/2 flex justify-end">
                                <button type="submit" class=" w-full flex align-middle items-center justify-center  focus:outline-none text-white bg-[#0064FF] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-28 py-5 me-2 mb-2"> Add Gallery</button>
                            </div>
                        </div>
                    </form>

                </div>
            </>
        </>
    )
}
export default GalleryModal