"use client"

import { useAuthContext } from '@/Context/AuthContext';
import Layout from '@/components/Layout/Layout';
import Login from '@/components/Login';
import axios from 'axios';
import React, { useState } from 'react'

const Notification = () => {
	const { adminToken } = useAuthContext();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			const data = {
				title, desc: body
			}
			axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/send`, data)
				.then((res) => {
					alert("Notifications sent!")
				})
		} catch (error) {
			alert("Network error!")
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
							<label htmlFor="title" className='text-sm font-semibold'>Notification Title:</label>
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