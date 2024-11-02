import React, { useEffect, useState } from "react"
import moment from "moment"
import { MdModeEdit } from "react-icons/md"
import SummaryAPI from "../../common/index"
import { toast } from "react-toastify"
import UpdateUserRole from "../Users/UpdateUserRole"

const AllUser = () => {
    const [allUser, setAllUser] = useState([])
    
    const [updaterole, setupdaterole] = useState(false)
    const [updateUser, setupdateUser] = useState({
        _id: "",
        name: "",
        email: "",
        role: "",
    })

    async function FetchAllUser() {
        const Fetchdata = await fetch(SummaryAPI.allUser.url, {
            method: SummaryAPI.allUser.method,
            credentials: "include",
        })
        const datarespone = await Fetchdata.json()

        if (datarespone.success) {
            setAllUser(datarespone.data)
        }
        if (datarespone.error) {
            toast.error(datarespone.error)
        }
    }

    useEffect(() => {
        FetchAllUser()
    }, [])

    return (
        <div className="bg-white pb-4">
            <table className="w-full userTable ">
                <thead>
                    <tr className="bg-black text-white ">
                        <td>STT</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td>Created Date</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((el, index) => {
                        return (
                            <tr key={el._id} >
                                <td>{index + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.role}</td>
                                <td >{moment(el?.createdAt).format("LLLL")}</td>
                                <td>
                                    <button
                                        className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                                        onClick={() => {
                                            setupdaterole(true)
                                            setupdateUser(el)
                                        }}
                                    >
                                        <MdModeEdit />
                                    </button>
                                    {updaterole && (
                                        <UpdateUserRole
                                            onClose={() => setupdaterole(false)}
                                            name={updateUser.name}
                                            email={updateUser.email}
                                            role={updateUser.role}
                                            userId={updateUser._id}
                                            callFunc={FetchAllUser}
                                        />
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AllUser
