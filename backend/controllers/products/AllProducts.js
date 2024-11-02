const ProductModel = require("../../models/ProductModel");

async function AllProduct(req,res) {
    try {
        const AllProduct = await ProductModel.find().sort({createAt:-1})

        res.json({
            message: "All Product!",
            data: AllProduct,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(200).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = AllProduct;
