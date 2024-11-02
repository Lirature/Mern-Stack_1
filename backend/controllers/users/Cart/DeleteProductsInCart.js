const CartModel = require("../../../models/CartModel");

async function DeleteProductInCart(req, res) {
    try {
        const ProductIdCart = req?.body._id;

        const DeleteProduct = await CartModel.deleteOne({ _id: ProductIdCart });

        res.status(200).json({
            message: "Delete Product In Cart",
            data: DeleteProduct,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: true,
            error: false,
        });
    }
}
module.exports = DeleteProductInCart;
