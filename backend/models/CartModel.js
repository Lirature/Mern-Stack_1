const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        ProductId: {
            ref: "Product",
            type: String,
        },
        quantity: Number,
        UserId: String,
    },
    {
        timestamps: true,
    },
);

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
