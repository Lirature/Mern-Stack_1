import React, { useState } from "react"
import { IoMdClose } from "react-icons/io"
import ROLE from "../../common/Role"
import SummaryAPI from "../../common"
import { toast } from "react-toastify"

const UpdateUserRole = ({ onClose, name, email, role, userId, callFunc }) => {
    const [userRole, setUserRole] = useState(role)

    const HandleOnChange = (e) => {
        setUserRole(e.target.value)
    }

    async function updateRole() {
        const Fetchdata = await fetch(SummaryAPI.UpdateRole.url, {
            method: SummaryAPI.UpdateRole.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                role: userRole,
                userId: userId,
            }),
        })
        const datarespone = await Fetchdata.json()

        if (datarespone.success) {
            toast.success(datarespone.message)
            onClose()
            callFunc()
        }
        if (datarespone.error) {
            toast.error(datarespone.err)
        }
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
            <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
                <button className="block ml-auto" onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
                <p>Name: {name}</p>
                <p>Email:{email}</p>
                <div className="flex items-center justify-between my-4">
                    <p>Role</p>
                    <select className="border px-4 py-1" onChange={HandleOnChange} value={userRole}>
                        {Object.values(ROLE).map((el) => {
                            return (
                                <option value={el} key={el}>
                                    {el}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <button
                    className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
                    onClick={updateRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    )
}

export default UpdateUserRole
