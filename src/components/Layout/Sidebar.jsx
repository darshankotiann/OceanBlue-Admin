"use client"
import Link from "next/link";
import { useState } from "react";
const Sidebar = () => {
    const [showDropdown, setShowDropDown] = useState(false);
    return (
        <>
            <div className="w-1/5 h-screen shadow-1xl ">
                <div className="w-full">
                    <div className="w-full flex justify-center p-4">
                        <img className="w-[60%]" src="/assets/Logo.png" />
                    </div>
                    <div>
                        <ul className="p-4">
                            <li >
                                <Link href="/" className="flex w-full px-4 py-4 cursor-pointer hover:text-[#0064FF]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-package-search"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" /><path d="m7.5 4.27 9 5.15" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /><circle cx="18.5" cy="15.5" r="2.5" /><path d="M20.27 17.27 22 19" /></svg>

                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg> */}
                                    <span className="text-lg font-semibold">Manage Products</span>
                                </Link>

                            </li>
                            <li >
                                <Link href="/categories" className="flex w-full px-4 py-4 cursor-pointer hover:text-[#0064FF]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-boxes"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" /><path d="m7 16.5-4.74-2.85" /><path d="m7 16.5 5-3" /><path d="M7 16.5v5.17" /><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" /><path d="m17 16.5-5-3" /><path d="m17 16.5 4.74-2.85" /><path d="M17 16.5v5.17" /><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" /><path d="M12 8 7.26 5.15" /><path d="m12 8 4.74-2.85" /><path d="M12 13.5V8" /></svg>

                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-package-search"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" /><path d="m7.5 4.27 9 5.15" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /><circle cx="18.5" cy="15.5" r="2.5" /><path d="M20.27 17.27 22 19" /></svg> */}
                                    <span className="text-lg font-semibold">Manage Category</span>
                                </Link>
                            </li>
                            <li >
                                <Link href="/gallery" className="flex w-full px-4 py-4 cursor-pointer hover:text-[#0064FF]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-book-image"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><circle cx="10" cy="8" r="2" /><path d="m20 13.7-2.1-2.1c-.8-.8-2-.8-2.8 0L9.7 17" /></svg>

                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-package-search"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" /><path d="m7.5 4.27 9 5.15" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /><circle cx="18.5" cy="15.5" r="2.5" /><path d="M20.27 17.27 22 19" /></svg> */}
                                    <span className="text-lg font-semibold">Manage Gallery</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="" onClick={() => setShowDropDown(!showDropdown)} className="flex w-full px-4 py-4 cursor-pointer hover:text-[#0064FF]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-git-pull-request-arrow"><circle cx="5" cy="6" r="3" /><path d="M5 9v12" /><circle cx="19" cy="18" r="3" /><path d="m15 9-3-3 3-3" /><path d="M12 6h5a2 2 0 0 1 2 2v7" /></svg>
                                    <span className="text-lg font-semibold">Manage Requests</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 mt-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
                                </Link>

                                <div id="dropdown" className={showDropdown ? "z-10  bg-white divide-y divide-gray-100" : "hidden"}>
                                    <ul class="px-12 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <a href="/product-enquiry" class="block px-4 py-2 text-md font-semibold ">Product Enquiry</a>
                                        </li>
                                        <li>
                                            <a href="/service-request" class="block px-4 py-2 text-md font-semibold ">Service Request</a>
                                        </li>
                                        <li>
                                            <a href="/emergency-enquiry" class="block px-4 py-2 text-md font-semibold ">Emergency Request</a>
                                        </li>
                                        <li>
                                            <a href="/resale-request" class="block px-4 py-2 text-md font-semibold">Resale Request</a>
                                        </li>
                                        <li>
                                            <a href="/sps-request" class="block px-4 py-2 text-md font-semibold">SPS Request</a>
                                        </li>
                                    </ul>
                                </div>

                            </li>
                            <li >
                                <Link href="/vendor" className="flex w-full px-4 py-4 cursor-pointer hover:text-[#0064FF]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    <span className="text-lg font-semibold">Manage Vendors</span>
                                </Link>
                            </li>
                            <li >
                                <Link href="/product-history" className="flex w-full px-4 py-4 cursor-pointer hover:text-[#0064FF]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
                                    <span className="text-lg font-semibold">Product History</span>
                                </Link>
                            </li>
                            <li >
                                <Link href="/notification" className="flex w-full px-4 py-4 cursor-pointer hover:text-[#0064FF]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
                                    <span className="text-lg font-semibold">Notification</span>
                                </Link>
                            </li>
                            <li >
                                <Link href="/notification-history" className="flex w-full px-4 py-4 cursor-pointer hover:text-[#0064FF]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
                                    <span className="text-lg font-semibold">Notification History</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="p-8">
                        <button type="button" onClick={() => { localStorage.removeItem("adminToken"); window.location.href = "/" }} class="flex align-middle focus:outline-none text-white bg-[#0064FF] hover:bg-[#4D70B6] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-4 lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                            Logout
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar;