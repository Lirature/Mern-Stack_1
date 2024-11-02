import SummaryAPI from "../common"
import { toast } from "react-toastify"

async function AddtoCart(e, id) {
    e?.stopPropagation()
    e?.preventDefault()

    const fetchdata = await fetch(SummaryAPI.AddToCart.url, {
        method: SummaryAPI.AddToCart.method,
        credentials: "include",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            ProductId: id,
        }),
    })
    const response = await fetchdata.json()
    if (response.success) {
        toast.success(response.message)
    }
    if (response.error) {
        toast.info(response.message)
    }

    return response
}
export default AddtoCart
