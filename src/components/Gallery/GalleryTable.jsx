import React, { useState, useEffect } from "react";
import CategoryModal from "../Modals/CategoryModal"
import { useCategoryContext } from "@/Context/CategoryContext"
import GalleryModal from "../Modals/GalleryModal";
import axios from "axios";
const GalleryTable = ({ showModal, setShowModal }) => {
    const [gallery, setGallery] = useState()
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/`)
            .then((response) => {
                setGallery(response.data.response)
                console.log(response.data.response)
            }).catch((error) => { console.log(error) })
    }, [])

    return (
        <>
            <div className="p-10">
                <h2 className="text-2xl font-bold">Manage Gallery</h2>
            </div>

            <div className="px-10 mb-4 gap-3 w-full grid grid-cols-12">
                <input type="email" id="email" class="col-span-8 bg-gray-50 text-gray-900 text-sm rounded-lg block  px-5 py-3 border-2 " placeholder="Search Product" />
                <button type="button" onClick={() => setShowModal(true)} class="  flex justify-center items-center col-span-4 text-white bg-[#0064FF] hover:bg-[#0064FF]  font-medium rounded-lg text-sm px-10 py-3"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" mr-2 lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Add Image/Video
                </button>
            </div>
            <div class="relative px-10 overflow-x-auto h-[75vh] ">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 ">
                        <tr >
                            <th scope="col" class="px-6 py-3">
                                Src
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Src Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {gallery?.map((gallery) => {
                            const galleryDelete = (e) => {
                                e.preventDefault()
                                const headers = {
                                    'authorization': `Bearer ${localStorage.getItem('adminToken')}`
                                }
                                axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/gallery/${gallery._id}`, { headers: headers })
                                    .then((response) => {
                                        alert("Product Deleted")
                                        window.location.reload();
                                    }).catch((error) => {
                                        console.log(error)
                                    })
                            }
                            return (
                                <tr key={gallery._id} class="bg-white border-b rounded-lg">
                                    <th  scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">

                                        {gallery.type == "image" ? <img className="w-20 h-20 rounded-lg" src={gallery.url} /> :
                                            <video src={gallery?.url} className="w-20 h-20 rounded-lg" />
                                        }

                                    </th>
                                    <td class="px-6 py-4">
                                        {gallery?.type}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className="flex">
                                            <svg onClick={galleryDelete} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <GalleryModal showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}

export default GalleryTable
