import React from "react"
import { useSelector } from "react-redux"
import { FaRegCircleUser } from "react-icons/fa6"
import { Link, Outlet } from "react-router-dom"

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user)

    return (
        <div className="min-h-[calc(100vh-120px)] md:flex hidden">
            <section className="bg-white min-h-full  w-full  max-w-60 customShadow">
                <div className=" flex justify-center items-center flex-col">
                    <div className="text-5xl  cursor-pointer py-2 flex justify-center">
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className="w-20 h-20 rounded-full  top-2" alt={user?.profilePic} />
                        ) : (
                            <FaRegCircleUser />
                        )}
                    </div>
                    <div className="relative py-2">
                        <p className="capitalize text-lg font-semibold  text-rose-500 "> {user?.name}</p>
                        <p className="text-sm">{user?.role}</p>
                    </div>
                </div>
                {/***navigation */}
                <div>
                    <nav className="grid p-4">
                        <Link className="px-2 py-1 hover:bg-slate-100" to={"all-users"}>
                            Tất cả người dùng
                        </Link>
                        <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
                            Tất cả sản phẩm
                        </Link>
                    </nav>
                </div>
            </section>
            <main className="w-full h-full px-2">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel
