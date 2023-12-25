import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";

const Login = () => {
    const{ setAdminToken}=useAuthContext()
    const initialValue = ({
        email: "", password: ""
    })
    const [data, setData] = useState(initialValue)
    const handleAuth = (e) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/signin`, data)
            .then((res) => {
                localStorage.setItem('adminToken', res.data.response)
                setAdminToken(localStorage.getItem('adminToken'))
            }).catch((error) => {
                console.log(error)
            })
    }
    const onDataChange = (e) => {
        setData(
            (values) => ({ ...values, [e.target.name]: e.target.value })
        )
    }
    return (
        <>
            <section class="bg-gray-50">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold  ">
                        <img class="w-full h-auto mr-2" src="./assets/Logo.png" alt="logo" />
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                                Ocean Blue Admin login
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#" method="post" onSubmit={handleAuth} >
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium  ">Your email</label>
                                    <input type="email" name="email" value={data?.email} onChange={onDataChange} id="email" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium  ">Password</label>
                                    <input type="password" name="password" value={data?.password} onChange={onDataChange} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>
                                <button type="submit" class="w-full text-white bg-[#0064FF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Login