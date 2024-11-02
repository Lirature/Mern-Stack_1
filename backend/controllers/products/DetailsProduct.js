const ProductModel = require("../../models/ProductModel");

async function DetailsProduct(req, res) {
    try {
        const { ProductId } = req.body;
        const product = await ProductModel.findById(ProductId);

        res.status(200).json({
            message: "Product Details",
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
module.exports = DetailsProduct;
