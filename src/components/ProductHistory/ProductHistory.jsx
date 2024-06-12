import { useState,useEffect } from "react"
import EnquiryViewModal from "../Modals/EnquiryViewModal"
import { useProductHistoryContext } from "@/Context/ProductHistory";

const ProducHistoryTable = () => {
    const { productHistory } = useProductHistoryContext();
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setSearchResult(productHistory)
    }, [productHistory])

    const handleFilter = (e) => {
        if (e.target.value.length == 0) {
            setSearchResult(productHistory)
            return
        }
        setSearchResult(productHistory.filter((data) => {
            return data?.vendorID?.fullname?.toLowerCase()?.includes(e.target.value.toLowerCase());
        }))
    }
    const [showModal, setShowModal] = useState({ show: false, data: undefined })
    return (
        <>
            <div className="p-10">
                <h2 className="text-2xl font-bold">Product History</h2>
            </div>

            <div className="px-10 mb-4 gap-3 w-full grid grid-cols-12">
                <input type="email" id="email" onChange={handleFilter} class="col-span-12 bg-gray-50 text-gray-900 text-sm rounded-lg block  px-5 py-3 border-2 " placeholder="Search Product" />
            </div>
            <div class="relative px-10 overflow-x-auto h-[75vh]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500  ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 ">
                        <tr >
                        <th scope="col" class="px-6 py-3">
                                Token Number
                            </th>
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
                                Product Purchased
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult?.map((productHistory) => {
                            return (
                                <tr key={productHistory._id} class="bg-white border-b rounded-lg">
                                    <td class="px-6 py-4">
                                        {productHistory?._id.slice(18)}
                                    </td>
                                    <td class="px-6 py-4">
                                        {productHistory?.vendorID?.fullname}
                                    </td>
                                    <td class="px-6 py-4">
                                        {productHistory?.vendorID?.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {productHistory?.vendorID?.phoneNo}
                                    </td>
                                    <td>
                                        {productHistory?.productID?.name}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <EnquiryViewModal showModal={showModal} setShowModal={setShowModal} />
        </>)
}
export default ProducHistoryTable