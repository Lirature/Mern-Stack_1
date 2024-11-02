import React, { useState } from "react"
import loginIcons from "../assets/signin.gif"
import { FaEyeSlash } from "react-icons/fa"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import SummaryAPI from "../common/index"
import ImageAvatar from "../helpers/ImageAvatar"

const Signup = () => {
    const [data, setdata] = useState({
        profilePic: "",
        name: "",
        email: "",
        password: "",
        comfirmpassword: "",
    })
    const [showpassconfirm, setshowpassconfirm] = useState(false)
    const [showpassword, setshowpassword] = useState(false)

    const Avatar = async (event) => {
        const file = event.target.files[0]

        if (file) {
            // Kiểm tra xem tệp có phải là hình ảnh không
            const ImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
            if (!ImageTypes.includes(file.type)) {
                // Hiển thị thông báo lỗi nếu tệp không phải hình ảnh
                toast.error("Vui lòng chọn các tệp có định dạng như jpg,png,webp...")
                return // Dừng hàm nếu tệp không hợp lệ
            }
            // Gọi hàm ImageAvatar để upload file
            const response = await ImageAvatar(file)
            // Giả định rằng URL của hình ảnh được trả về trong response.url
            if (response && response.url) {
                setdata((prev) => ({
                    ...prev,
                    profilePic: response.url, // Cập nhật profilePic bằng URL từ Cloudinary
                }))
            }
        }
    }

    const navigate = useNavigate()

    const HandleOnChange = (e) => {
        const { name, value } = e.target
        setdata((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    async function HandleSubmit(e) {
        e.preventDefault()

        if (data.comfirmpassword === data.password) {
            // console.log(SummaryAPI.SignUp.url)
            const dataRespone = await fetch(SummaryAPI.SignUp.url, {
                method: SummaryAPI.SignUp.method,
                headers: {
                    "content-type": "application/json",
                    // Có một số API sẽ nhìn vào headers mới nhả API(POST).
                },
                body: JSON.stringify(data),
            })

            const dataAPI = await dataRespone.json()
            if (dataAPI.success) {
                toast.success(dataAPI.message)
                navigate("/login")
            }
            if (dataAPI.error) {
                toast.error(dataAPI.message)
            }
        } else {
            toast.error("Please check your password and confirm password")
        }
    }

    return (
        <section id="signup">
            <div className="mx-auto container p-4 ">
                <div className="bg-white p-5 w-full max-w-sm mx-auto border border-black">
                    <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                        <form>
                            <img src={data.profilePic || loginIcons} alt="login icons" />
                            <label>
                                <div className="text-xs bg-slate-200 bg-opacity-80  pb-4 pt-1 cursor-pointer text-center absolute bottom-0 w-full">
                                    Upload Photo
                                </div>
                                <input type="file" className="hidden" onChange={Avatar} />
                            </label>
                        </form>
                    </div>
                    <form className="pt-6 flex-col flex gap-3" onSubmit={HandleSubmit}>
                        <div className="grid">
                            <label>Name : </label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="text"
                                    placeholder="enter your name"
                                    name="name"
                                    value={data.name}
                                    onChange={HandleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Email : </label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="email"
                                    placeholder="enter your email"
                                    name="email"
                                    value={data.email}
                                    onChange={HandleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password : </label>
                            <div className="bg-slate-100 p-2 flex">
                                <input
                                    type={showpassword ? "text" : "password"}
                                    placeholder="enter your password"
                                    name="password"
                                    value={data.password}
                                    onChange={HandleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div className="cursor-pointer text-xl" onClick={() => setshowpassword((prev) => !prev)}>
                                    <span>{showpassword ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>ConfirmPassword : </label>
                            <div className="bg-slate-100 p-2 flex">
                                <input
                                    type={showpassconfirm ? "text" : "password"}
                                    placeholder="enter your password"
                                    name="comfirmpassword"
                                    value={data.comfirmpassword}
                                    onChange={HandleOnChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div className="cursor-pointer text-xl" onClick={() => setshowpassconfirm((preve) => !preve)}>
                                    <span>{showpassconfirm ? <FaEye /> : <FaEyeSlash />}</span>
                                </div>
                            </div>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                            Sign Up
                        </button>
                    </form>
                    <p className="my-5">
                        Already have account ?{" "}
                        <Link to={"/login"} className=" text-red-600 hover:text-red-700 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Signup
