"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '@/Context/AuthContext';
import { useCategoryContext } from '@/Context/CategoryContext';
import { useProductEnquiryContext } from '@/Context/ProductEnquiryContext';
import { useVendorContext } from '@/Context/VendorContext';
import Layout from '@/components/Layout/Layout';
import Login from '@/components/Login';
import SearchableSelect from '@/Context/SearchOption';

const Notification = () => {
	const { adminToken } = useAuthContext();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const { vendorData } = useVendorContext();
	const { productEnquires } = useProductEnquiryContext();
	const { categories } = useCategoryContext();

	const [filter, setFilter] = useState("");
	const [selectedVendors, setSelectedVendors] = useState([]);
	const [listType, setListType] = useState("vendor");
	const [list, setList] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let toTokens = [];

		if (listType == "vendor") {

			toTokens = [...new Set(selectedVendors.map(item => item.fcmtoken).filter(token => token))];
		} else {
			toTokens = [...new Set(selectedVendors.map(item => item.vendorID.fcmtoken).filter(token => token))]
		}
		const data = {
			title, desc: body, tokens: toTokens
		};
		console.log(data)
		if (selectedVendors.length === 0) {
			axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/send-all`, data)
				.then(() => alert("Notifications sent!"));
		} else {
			axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, { ...data, tokens: toTokens })
				.then(() => {
					alert("Notifications sent!");
					window.location.reload();
				})
				.catch(() => alert("Network error!"));
		}
	};

	useEffect(() => {
		setList(vendorData?.map((vendor) => ({
			...vendor,
			label: `${vendor.fullname} (#${vendor._id.slice(18)})`,
			value: vendor._id
		})));
	}, [vendorData]);

	const handleList = (type) => {
		if (type === 'vendor') {
			setListType("vendor");
			const vendors = vendorData?.map((vendor) => ({
				...vendor,
				label: `${vendor.fullname} (#${vendor._id.slice(18)})`,
				value: vendor._id
			}));
			setList(vendors);
			setSelectedVendors(vendors);
		} else {
			setListType("category");
			const enquiryList = productEnquires?.map((order) => ({
				...order,
				label: `${order.vendorID.fullname} (#${order._id.slice(18)})`,
				value: order.vendorID._id
			}));
			setList(enquiryList);
			setSelectedVendors(enquiryList);
		}
	};

	useEffect(() => {
		const enquiryList = filter === "" ? productEnquires : productEnquires?.filter((e) => e?.productID?.category === filter);
		setSelectedVendors(enquiryList?.map((order) => ({
			...order,
			label: `${order.vendorID.fullname} (#${order._id.slice(18)})`,
			value: order.vendorID._id
		})));
		setList(enquiryList?.map((order) => ({
			...order,
			label: `${order.vendorID.fullname} (#${order._id.slice(18)})`,
			value: order.vendorID._id
		})));
	}, [filter]);

	return (
		<>
			{adminToken ? (
				<Layout>
					<div className="p-10">
						<h2 className="text-2xl font-bold">Notification</h2>
					</div>
					<div className="px-20">
						<form onSubmit={handleSubmit} className='bg-white p-20 flex flex-col h-full'>
							<div className='flex gap-4 mb-3'>
								<label htmlFor="vendor">
									Vendor
									<input onChange={() => handleList("vendor")} type="radio" name="type" id="vendor" />
								</label>
								<label htmlFor="category">
									Category
									<input onChange={() => handleList("category")} type="radio" name="type" id="category" />
								</label>
							</div>
							{listType === "category" && (
								<div className='mb-3'>
									<label htmlFor="category" className='mt-4 text-sm font-semibold'>Category:</label>
									<select onChange={(e) => setFilter(e.target.value)} value={filter} id='category' className="w-full py-3 bg-gray-50 text-gray-900 text-sm rounded-lg block p-2 border-2">
										<option value="">---Select---</option>
										{categories?.map((category) => (
											<option key={category._id} value={category._id}>
												{category.name + " #" + category._id.slice(18)}
											</option>
										))}
									</select>
								</div>
							)}
							<SearchableSelect
								onChange={(e) => setSelectedVendors(e)}
								id="to"
								value={selectedVendors}
								isMulti
								options={list}
							/>
							<label htmlFor="title" className='mt-4 text-sm font-semibold'>Notification Title:</label>
							<input onChange={(e) => setTitle(e.target.value)} value={title} id='title' type="text" className="w-full py-3 bg-gray-50 text-gray-900 text-sm rounded-lg block p-2 border-2" placeholder="title" required />

							<label htmlFor="body" className='mt-4 text-sm font-semibold'>Notification Description:</label>
							<textarea onChange={(e) => setBody(e.target.value)} value={body} id='body' className="h-40 w-full py-3 bg-gray-50 text-gray-900 text-sm rounded-lg block p-2 border-2" placeholder="body" required></textarea>
							<button type="submit" className="mt-5 w-full text-white bg-[#0064FF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send</button>
						</form>
					</div>
				</Layout>
			) : (
				<Login />
			)}
		</>
	);
};

export default Notification;
