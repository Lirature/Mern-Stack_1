const ProductModel = require("../../models/ProductModel");

async function CategoryProduct(req, res) {
    try {
        const productCategory = await ProductModel.distinct("Category");
        // console.log("Category",productCategory)


        // array to store one product from each category
        const productByCategory = [];

        for (const Category of productCategory) {
            const product = await ProductModel.findOne({Category});

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message:"Product Category",
            data:productByCategory,
            success:true,
            error:false,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = CategoryProduct;
