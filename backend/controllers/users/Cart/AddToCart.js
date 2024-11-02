const CartModel = require("../../../models/CartModel");

async function AddToCart(req, res) {
    try {
        const { ProductId } = req?.body;
        const currentUser = req?.userId;

        const ProductAvailable = await CartModel.findOne({ ProductId, UserId: currentUser });
        console.log("ProductAvailable", ProductAvailable);

        if (ProductAvailable) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
            ProductAvailable.quantity += 1;
            await ProductAvailable.save(); // Lưu thay đổi

            return res.status(200).json({
                message: "Product quantity updated in Cart",
                data: ProductAvailable,
                success: true,
                error: false,
            });
        } else {
            // Nếu sản phẩm chưa tồn tại, tạo bản ghi mới
            const payload = {
                ProductId: ProductId,
                quantity: 1,
                UserId: currentUser,
            };

            const newCartProduct = new CartModel(payload);
            const saveCart = await newCartProduct.save();

            return res.status(200).json({
                message: "Product Added in Cart",
                data: saveCart,
                success: true,
                error: false,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}
module.exports = AddToCart;
