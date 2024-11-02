const CartModel = require("../../../models/CartModel");

async function CountAddToCart(req, res) {
    try {
        const userId = req.userId;
        const Count = await CartModel.countDocuments({
            UserId: userId,
        });

        return res.status(200).json({
            data: { Count: Count },
            message: "OK!",
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
module.exports = CountAddToCart;
