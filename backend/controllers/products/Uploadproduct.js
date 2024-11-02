const PermissionController = require("../../helpers/Permission");
const ProductModel = require("../../models/ProductModel")

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;
    
        if(!PermissionController(sessionUserId)){
            throw new Error("Permisson denided")
        }
        
        const uploadProduct = await ProductModel(req.body);
        const saveProduct = await uploadProduct.save()
        
        res.status(201).json({
            message:"Product uploaded successfully!",
            data:saveProduct,
            success:true,
            error:false,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: true,
        });
    }
}

module.exports = UploadProductController
