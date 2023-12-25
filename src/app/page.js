"use client"
import Image from 'next/image'
import Layout from '@/components/Layout/Layout'
import ProductTable from '@/components/Product/ProductTable'
import { useState } from 'react'
import Login from '@/components/Login'
import Product from './categories/page'
import ProductModal from '@/components/Modals/ProductModal'

import { useAuthContext } from '@/Context/AuthContext'


export default function Home() {
  const { adminToken } = useAuthContext();
  const [showModal, setShowModal] = useState({ show: false, update: true, data: undefined });
  const [isuserLogin, setISUserLogin] = useState({ show: false, token: undefined });

  return (
    <>
      {
        adminToken ? <Layout>
         
          <ProductTable showModal={showModal} setShowModal={setShowModal} />
          <ProductModal showModal={showModal} setShowModal={setShowModal} />
        </Layout> : <Login />
      }

    </>
  )
}
