import React, { useState } from "react"
import { MdModeEditOutline } from "react-icons/md"

import UpdateProduct from "./UpdateProduct"
import displayVNDCurrency from "../../helpers/displayVNDCurrency"

const ProductCard = ({ data, fetchdata }) => {
    const [updateProduct, setUpdateProduct] = useState(false)

    return (
        <div className="bg-white rounded h-60 border">
            <div className="w-56 h-56">
                <div className=" w-full h-36 ">
                    <img src={data?.Productimage[0]} className="h-36 object-fill  w-auto mx-auto " alt="" />
                </div>

                <div className="h-14 pt-2">
                    <h1 className="text-ellipsis line-clamp-2 h-[2.8em] ">{data.Productname}</h1>
                    <div className="flex items-center mt-2">
                        <p className="font-semibold">{displayVNDCurrency(data.Sellingprice)}</p>
                        <button
                            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
                            onClick={() => setUpdateProduct(true)}
                        >
                            <MdModeEditOutline />
                        </button>
                        {updateProduct && (
                            <UpdateProduct onClose={() => setUpdateProduct(false)} productData={data} fetchData={fetchdata} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
