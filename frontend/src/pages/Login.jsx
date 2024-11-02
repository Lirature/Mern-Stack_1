import React, { useContext, useState } from "react"
import loginIcons from "../assets/signin.gif"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import SummaryAPI from "../common"
import { toast } from "react-toastify"
import Context from "../context"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const [data, setdata] = useState({
        email: "",
        password: "",
    })

    const HandleOnChange = (e) => {
        const { name, value } = e.target

        setdata((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const navigate = useNavigate()
    const { FetchUserCurrent,FetchUserInCart } = useContext(Context)

    const HandleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryAPI.SignIn.url, {
            method: "Post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const dataAPI = await response.json()

        if (dataAPI.success) {
            toast.success("Login Successfully!")
            navigate("/")
            FetchUserCurrent()
            FetchUserInCart()
        }
        if (dataAPI.error) {
            toast.error(dataAPI.message)
        }
    }

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto border border-black">
                    <div className="w-20 h-20 mx-auto">
                        <img src={loginIcons} alt="login icons" />
                    </div>
                    <form className="pt-6 flex flex-col gap-2" onSubmit={HandleSubmit}>
                        <div>
                            <label>Email : </label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="email"
                                    placeholder="enter your email"
                                    name="email"
                                    value={data.email}
                                    onChange={HandleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password : </label>
                            <div className="bg-slate-100 p-2 flex">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="enter your password"
                                    name="password"
                                    value={data.password}
                                    onChange={HandleOnChange}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div className="cursor-pointer text-xl " onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                            </div>
                            {/* <Link to={"/forgot-password"} className="block w-fit ml-auto hover:underline hover:text-red-600">
                                Forgot password ?
                            </Link> */}
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                            Login
                        </button>
                    </form>
                    <p className="my-5">
                        Don't have account ?{" "}
                        <Link to={"/sign-up"} className=" text-red-600 hover:text-red-700 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login
