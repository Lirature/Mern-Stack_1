const ProductModel = require("../../models/ProductModel");

async function FilterProducts(req, res) {
    try {
        const FilterProduct = req?.body?.Category || [];

        const product = await ProductModel.find({
            Category: {
                $in: FilterProduct,
            },
        });

        res.status(200).json({
            message: "Product!",
            data: product,
            success: true,
            error: false,
        });

        
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}
module.exports = FilterProducts;
