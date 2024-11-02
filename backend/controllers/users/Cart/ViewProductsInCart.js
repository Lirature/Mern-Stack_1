const CartModel = require("../../../models/CartModel");

async function ViewProductCart(req, res) {
    try {
        const currentUser = req.userId;

        const allproduct = await CartModel.find({
            UserId: currentUser,
        }).populate("ProductId");

        return res.status(200).json({
            message: "Product In Cart ",
            data: allproduct,
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
module.exports = ViewProductCart;
