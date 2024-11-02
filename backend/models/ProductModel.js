const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        Productname: String,
        Brandname: String,
        Category: String,
        Productimage: [],
        Description: String,
        Price: Number,
        Sellingprice: Number,
    },
    {
        timestamp: true,
    },
);
const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
