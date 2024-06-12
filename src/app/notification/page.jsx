"use client"

import { useAuthContext } from '@/Context/AuthContext';
import { useProductHistoryContext } from '@/Context/ProductHistory';
import SearchableSelect from '@/Context/SearchOption';
import { useVendorContext } from '@/Context/VendorContext';
import Layout from '@/components/Layout/Layout';
import Login from '@/components/Login';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Notification = () => {
	const { adminToken } = useAuthContext();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const { vendorData } = useVendorContext();
	const { productHistory } = useProductHistoryContext();
	const [tokens, setTokens] = useState([])
	const [selectedVendors, setSelectedVendors] = useState([])
	const [listType, setListType] = useState("vendor")
	const [list, setList] = useState([])

	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {
			title, desc: body, tokens
		}
		if (selectedVendors.length == 0) {
			axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/send-all`, data)
				.then((res) => {
					alert("Notifications sent!")
				})
		} else {
			if (selectedVendors.length != tokens.length) {
				alert(`${selectedVendors.length - tokens.length} have not permitted for notifications`)
			}
			try {
				axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, { ...data, tokens })
					.then((res) => {
						alert("Notifications sent!")
					})
			} catch (error) {
				alert("Network error!")
			}
		}
	}

	const handleTokens = (vendors) => {
		setSelectedVendors(vendors)
		if (listType == "vendor") {
			setTokens(vendors
				.map(item => item.fcmtoken)
				.filter(token => token !== '' && token !== undefined && token !== null))
		} else {
			setTokens(productHistory
				.map(item => item.vendorID.fcmtoken)
				.filter(token => token !== '' && token !== undefined && token !== null));
		}
	}

	useEffect(() => {
		setList(vendorData?.map((vendor) => {
			return {
				...vendor,
				label: `${vendor.fullname} (#${vendor._id.slice(18)})`,
				value: vendor._id
			}
		}))
	}, [vendorData]);

	const handleList = (e) => {
		if (e == 'vendor') {
			setListType("vendor");
			setList(vendorData?.map((vendor) => {
				return {
					...vendor,
					label: `${vendor.fullname} (#${vendor._id.slice(18)})`,
					value: vendor._id
				}
			}))
		} else {
			setListType("order");
			setList(productHistory?.map((order) => {
				return {
					...order,
					label: `${order.vendorID.fullname} (#${order._id.slice(18)}) [${order.productID.category.brand} (${order.productID.category.name})]`,
					value: vendor._id
				}
			}))
		}
	}
	return (
		<>
			{
				adminToken ? <Layout>
					<div className="p-10">
						<h2 className="text-2xl font-bold">Notification</h2>
					</div>
					<div class="px-20 h-[75vh]">
						<form onSubmit={handleSubmit} className='bg-white p-20 flex flex-col h-full' >
							<div className='flex gap-4 mb-3'>
								<label htmlFor="vendor">Vendor <input onChange={() => handleList("vendor")} type="radio" name="type" id="vendor" /></label>
								<label htmlFor="order">Order <input onChange={() => handleList("order")} type="radio" name="type" id="order" /></label>
							</div>
							<SearchableSelect onChange={handleTokens} id={"to"} isMulti={true} options={list} />
							<label htmlFor="title" className='mt-4 text-sm font-semibold'>Notification Title:</label>
							<input onChange={(e) => setTitle(e.target.value)} value={title} id='title' type="text" className="w-full py-3 bg-gray-50 text-gray-900 text-sm rounded-lg block  p-2 border-2 " placeholder="title" required />

							<label htmlFor="body" className='mt-4 text-sm font-semibold'>Notification Description:</label>
							<textarea onChange={(e) => setBody(e.target.value)} value={body} id='body' type="text" className="h-40 w-full py-3 bg-gray-50 text-gray-900 text-sm rounded-lg block  p-2 border-2 " placeholder="body" required ></textarea>
							<button type="submit" className="mt-5 w-full text-white bg-[#0064FF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send</button>
						</form>
					</div>
				</Layout> : <Login />
			}

		</>
	)
}

export default Notification