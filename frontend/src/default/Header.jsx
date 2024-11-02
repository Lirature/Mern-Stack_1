import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Logo from "../helpers/Logo"
import { GrSearch } from "react-icons/gr"
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import SummaryAPI from "../common"
import { toast } from "react-toastify"
import { setUsers } from "../store/userSlice"
import Role from "../common/Role"
import Context from "../context"

const Header = () => {
    const user = useSelector((state) => state?.user?.user)
    const dispatch = useDispatch()
    const context = useContext(Context)
    const navigate = useNavigate()
    const [menuDisplay, setMenuDisplay] = useState(false)
    //Logout User
    const handleLogout = async () => {
        const fetchdata = await fetch(SummaryAPI.logout_user.url, {
            method: SummaryAPI.logout_user.method,
            credentials: "include",
        })
        const data = await fetchdata.json()

        if (data.success) {
            toast.warn(data.message)
            dispatch(setUsers(null))
            navigate("/")
        }
        if (data.error) {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        if (!user) {
            setMenuDisplay(false);
        }
    }, [user]);
    //Search
    const searchInput = useLocation()
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.get("q") || ""
    const [search, setSearch] = useState(searchQuery)

    const handleSearch = (value) => {
        setSearch(value) // Cập nhật state
        if (value) {
            navigate(`/search?q=${value}`) // Điều hướng nếu có giá trị
        } else {
            navigate("/search") // Điều hướng đến trang tìm kiếm chung nếu không có giá trị
        }
    }

    const handleInputChange = (e) => {
        const { value } = e.target
        setSearch(value) // Cập nhật state khi input thay đổi
    }

    const handleSearchClick = () => {
        handleSearch(search) // Gọi hàm tìm kiếm với giá trị hiện tại
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch(search) // Gọi hàm tìm kiếm khi nhấn Enter
        }
    }

    const clearInput = () => {
        setSearch("") // Xóa giá trị trong input
    }

    return (
        <header className="header h-16 flex justify-center shadow-md bg-white fixed w-full z-40">
            <div className="h-full container  flex items-center px-4 gap-3 justify-between">
                <div className="logo " onClick={clearInput}>
                    <Link to={"/"}>
                        <Logo />
                    </Link>
                </div>

                <div className="searchbox hidden md:flex items-center w-full justify-between max-w-xl border rounded-full focus-within:shadow  pl-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full outline-none"
                        onKeyDown={handleKeyPress}
                        onChange={handleInputChange}
                        value={search}
                    />
                    <div
                        className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer"
                        onClick={handleSearchClick}
                    >
                        <GrSearch />
                    </div>
                </div>

                <div className="w-52 flex items-center  gap-5">
                    <div className="hidden lg:flex cursor-pointer relative items-center">
                        {user?._id && (
                            <div
                                className="text-4xl relative flex justify-center"
                                onClick={() => {
                                    if (user?.role === Role.ADMIN) {
                                        setMenuDisplay((prev) => !prev)
                                    }
                                }}
                            >
                                {user?.profilePic ? (
                                    <img src={user?.profilePic} className="w-10 h-10 rounded-full " alt={user?.name} />
                                ) : (
                                    <FaRegUserCircle />
                                )}
                            </div>
                        )}
                        {menuDisplay && (
                            <div
                                className="absolute bg-white bottom-0 top-10  h-fit p-2 shadow-lg rounded"
                                style={{ right: "-2.2rem" }}
                            >
                                <nav>
                                    {user?.role === Role.ADMIN && (
                                        <Link
                                            to={"/admin-panel/all-users"}
                                            className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-1"
                                            onClick={() => setMenuDisplay((prev) => !prev)}
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                </nav>
                            </div>
                        )}
                    </div>
                    {user?._id ? (
                        <Link to={"/cart"} className="text-3xl relative">
                            <span>
                                <FaShoppingCart />
                            </span>
                            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                                <p className="text-sm">{context.ProductInCart}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="text-3xl relative">
                            <span>
                                <FaShoppingCart />
                            </span>
                        </div>
                    )}

                    <div className="text-md">
                        {user?._id ? (
                            <button
                                onClick={handleLogout}
                                className=" w-20  px-1 py-2 text-base rounded-full text-white bg-red-600 hover:bg-red-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to={"/login"}
                                className=" w-10  px-3 py-2 text-base rounded-full text-white bg-red-600 hover:bg-red-700"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
