"use client"

import Script from 'next/script'
import { Poppins } from 'next/font/google'
import './globals.css'


import { AuthProvider } from '@/Context/AuthContext'
import { CatgoryProvider } from "../Context/CategoryContext"
import { ProductProvider } from '@/Context/ProductContext'
import { ProductEnquiryProvider } from '@/Context/ProductEnquiryContext'
import { ProductHistoryProvider } from '@/Context/ProductHistory'
import { VendorProvider } from '@/Context/VendorContext'
import { ServiceRequestProvider } from '@/Context/ServiceRequestContext'
import { EmergencyServiceRequestProvider } from '@/Context/EmergencyRequestContext'
import { ResaleServiceRequestProvider } from '@/Context/ResaleServiceRequest'
import { SpsServiceRequestProvider } from '@/Context/SpsRequestContext'
import {  NotificationProvider } from '@/Context/NotificationContext'
const poppins = Poppins({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700", "800", "900"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://upload-widget.cloudinary.com/global/all.js"
          onLoad={() => {
            console.log('Script has loaded')
          }} />
      </head>

      <body className={poppins.className}>
        <AuthProvider>
          <NotificationProvider>
            <CatgoryProvider>
              <ProductProvider>
                <ProductEnquiryProvider>
                  <ProductHistoryProvider>
                    <VendorProvider>
                      <ServiceRequestProvider>
                        <EmergencyServiceRequestProvider>
                          <ResaleServiceRequestProvider>
                            <SpsServiceRequestProvider>
                              {children}
                            </SpsServiceRequestProvider>
                          </ResaleServiceRequestProvider>
                        </EmergencyServiceRequestProvider>
                      </ServiceRequestProvider>
                    </VendorProvider>
                  </ProductHistoryProvider>
                </ProductEnquiryProvider>
              </ProductProvider>
            </CatgoryProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
