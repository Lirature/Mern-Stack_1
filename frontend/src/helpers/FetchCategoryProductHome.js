import SummaryAPI from "../common"

async function FetchCategoryProductHome(Category) {
    
    const response = await fetch(SummaryAPI.ProductHome.url, {
        method: SummaryAPI.ProductHome.method,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            Category: Category,
        }),
    })
    const dataresponse = response.json()
    return dataresponse
}

export default FetchCategoryProductHome
