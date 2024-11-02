import React, { useState } from "react"
import { CgClose } from "react-icons/cg"
import productCategory from "../../helpers/productCategory"
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import SummaryAPI from "../../common"
import ImageProduct from "../../helpers/ImageProduct"
import { toast } from "react-toastify"
import DisplayImage from "./DisplayImage"

const UploadProduct = ({ onClose, fetchData }) => {
    const [data, setdata] = useState({
        Productname: "",
        Brandname: "",
        Category: "",
        Productimage: [],
        Description: "",
        Price: "",
        Sellingprice: "",
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [FullScreenImage, setFullScreenImage] = useState("")

    
    async function HandleProductDelete(index) {
        console.log("Delete image", index)
        const newProductImage = [...data.Productimage]
        newProductImage.splice(index, 1)
        setdata((prev) => {
            return {
                ...prev,
                Productimage: [...newProductImage],
            }
        })
    }

    const HandleOnChange = (e) => {
        const { name, value } = e.target
        setdata((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    async function HandleUploadImage(e) {
        const file = e.target.files[0]
        if (file) {
            const FileType = ["image/jpeg", "image/png", "image/gif", "image/webp"]
            if (!FileType.includes(file.type)) {
                toast.error("Vui lòng chọn các tệp có định dạng như jpg,png,webp...")
                return
            }
            const uploadImageCloudiary = await ImageProduct(file)
            setdata((prev) => {
                return {
                    ...prev,
                    Productimage: [...prev.Productimage, uploadImageCloudiary.url],
                }
            })
        }
    }

    //upload
    async function HandleSubmit(e) {
        e.preventDefault()

        const fetchdata = await fetch(SummaryAPI.UploadProduct.url, {
            method: SummaryAPI.UploadProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const responesedata = await fetchdata.json()

        if (responesedata.success) {
            toast.success(responesedata.message)
            onClose()
            fetchData()
        }
        if (responesedata.error) {
            toast.error(responesedata.message)
        }
    }

    return (
        <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[70%] overflow-hidden">
                <div className="flex justify-between items-center pb-3">
                    <h2 className="font-bold text-lg">Upload Product</h2>
                    <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <form className=" p-4 gap-2 overflow-y-scroll pb-5 h-full max-h-[94%] grid" onSubmit={HandleSubmit}>
                    <section className="flex flex-col gap-3 ">
                        <label htmlFor="Productname">Product Name :</label>
                        <input
                            type="text"
                            id="Productname"
                            placeholder="enter product name"
                            name="Productname"
                            onChange={HandleOnChange}
                            value={data.Productname}
                            className="p-2 bg-slate-100 border rounded"
                            required
                        />
                    </section>
                    <section className="flex flex-col gap-3 ">
                        <label htmlFor="Brandname">Brand Name :</label>
                        <input
                            type="text"
                            id="Brandname"
                            placeholder="enter brand name"
                            name="Brandname"
                            onChange={HandleOnChange}
                            value={data.Brandname}
                            className="p-2 bg-slate-100 border rounded"
                            required
                        />
                    </section>
                    <section className="flex flex-col gap-3 ">
                        <label className="mt-3">Category :</label>
                        <select className="p-2 bg-slate-100 border rounded" name="Category" onChange={HandleOnChange}>
                            <option value="">Select category</option>
                            {productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>
                                        {el.label}
                                    </option>
                                )
                            })}
                        </select>
                    </section>
                    <section className="flex flex-col gap-3 ">
                        <label className="mt-3">Product Image :</label>
                        <label htmlFor="uploadImageInput">
                            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                                    <span>
                                        <FaCloudUploadAlt />
                                    </span>
                                    <p className="text-sm">Upload Product Image</p>
                                    <input type="file" id="uploadImageInput" className="hidden" onChange={HandleUploadImage} />
                                </div>
                            </div>
                        </label>
                    </section>
                    <section className="flex flex-col gap-3 ">
                        {data?.Productimage[0] ? (
                            <div className="flex items-center gap-2">
                                {data.Productimage.map((el, index) => {
                                    return (
                                        <div className="relative group" key={el}>
                                            <img
                                                src={el}
                                                alt={el}
                                                width={80}
                                                height={80}
                                                className="bg-slate-100 border cursor-pointer"
                                                onClick={() => {
                                                    setOpenFullScreenImage(true)
                                                    setFullScreenImage(el)
                                                }}
                                            />
                                            <div
                                                className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                                                onClick={() => HandleProductDelete(index)}
                                            >
                                                <MdDelete />
                                            </div>
                                            {/* Display full screen */}
                                            {openFullScreenImage && (
                                                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={FullScreenImage} />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-red-600 text-xs">*Please upload product image</p>
                        )}
                    </section>
                    <section className="flex flex-col gap-3 ">
                        <label htmlFor="Price" className="mt-3">
                            Price :
                        </label>
                        <input
                            type="number"
                            id="Price"
                            placeholder="enter Price"
                            value={data.Price}
                            onChange={HandleOnChange}
                            name="Price"
                            className="p-2 bg-slate-100 border rounded"
                            required
                        />
                    </section>
                    <section className="flex flex-col gap-3 ">
                        <label htmlFor="Sellingprice" className="mt-3">
                            Selling Price :
                        </label>
                        <input
                            type="number"
                            id="Sellingprice"
                            placeholder="enter selling price"
                            value={data.Sellingprice}
                            onChange={HandleOnChange}
                            name="Sellingprice"
                            className="p-2 bg-slate-100 border rounded"
                            required
                        />
                    </section>
                    <section className="flex flex-col gap-3 ">
                        <label htmlFor="Description" className="mt-3">
                            Description :
                        </label>
                        <textarea
                            className="h-28 bg-slate-100 border resize-none p-1"
                            placeholder="enter product description"
                            id="Description"
                            rows={3}
                            name="Description"
                            onChange={HandleOnChange}
                            value={data.Description}
                        ></textarea>
                    </section>
                    <section className="flex flex-col gap-3 ">
                        <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">Upload Product</button>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default UploadProduct
