import React, { useEffect, useState } from "react"

import UploadProduct from "./UploadProduct"
import ProductCard from "./ProductCard"
import SummaryAPI from "../../common"

const AllProducts = () => {
    const [uploadProduct, setUploadProduct] = useState(false)
    const [allproduct, setAllProduct] = useState([])

    async function fetchAllProduct() {
        const fetchdata = await fetch(SummaryAPI.allProduct.url)
        const dataResponse = await fetchdata.json()

        console.log("product data", dataResponse)

        setAllProduct(dataResponse?.data || [])
    }
    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <div>
            {/* Upload Product */}
            <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">All Product</h2>
                <button
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
                    onClick={() => setUploadProduct(true)}
                >
                    Upload Product
                </button>
                {uploadProduct && <UploadProduct onClose={() => setUploadProduct(false)} fetchData={fetchAllProduct} />}
            </div>
            {/* All product */}
            <div className="flex flex-wrap gap-5 pt-5  overflow-y-scroll">
                {allproduct.map(( product,index) => {
                    return <ProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
                })}
            </div>
        </div>
    )
}

export default AllProducts
