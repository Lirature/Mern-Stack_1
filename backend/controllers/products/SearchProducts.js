const ProductModel = require("../../models/ProductModel");

async function SearchProducts(req, res) {
    try {
        const query = req.query.q;

        const Regex = new RegExp(query, "i", "g");

        const SearchProduct = await ProductModel.find({
            $or: [
                {
                    Productname: Regex,
                },
                {
                    Category: Regex,
                },
            ],
        });

        res.status(200).json({
            message: "Search Result!",
            data: SearchProduct,
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
module.exports = SearchProducts;
