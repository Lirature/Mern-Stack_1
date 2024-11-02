import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import SummaryAPI from "../../common"
import SearchResultPage from "./SearchResultPage"

const SearchProducts = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const query = useLocation()

    async function SearchProducts() {
        setloading(true)
        const fetchdata = await fetch(SummaryAPI.SearchProducts.url + query.search)
        const response = await fetchdata.json()
        if (response.success) {
            setdata(response.data)
        }
        setloading(false)
    }

    useEffect(() => {
        SearchProducts()
    }, [query])
    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-lg text-center">Loading...</p>}
            <p className="text-lg font-semibold my-3">Kết Quả Tìm Kiếm: {data.length}</p>
            {data.length === 0 && !loading && <p className="bg-white text-lg text-center p-4">Không Tìm Thấy Sản Phẩm </p>}
            {data.length !== 0 && !loading && <SearchResultPage data={data} loading={loading}  />}
        </div>
    )
}

export default SearchProducts
