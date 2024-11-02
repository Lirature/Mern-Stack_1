const CartModel = require("../../../models/CartModel");

async function UpdateProductInCart(req, res) {
    try {
        const ProducIdCart = req.body._id;

        const qty = req.body.quantity;

        const updateProduct = await CartModel.updateOne(
            {
                _id: ProducIdCart,
            },
            { ...(qty && { quantity: qty }) },
            // Việc dùng toán tử spread(...) giúp kiểm soát điều kiện khiến tránh qty có giá trị như null,undefined hoặc 0
        );

        res.status(200).json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: true,
            error: false,
        });
    }
}
module.exports = UpdateProductInCart;
