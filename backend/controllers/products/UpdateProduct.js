const ProductModel = require("../../models/ProductModel");
const permission = require("../../helpers/Permission")

async function UpdateProduct(req,res){
    try{

        if(!permission(req.userId)){
            throw new Error("Permission denied!")
        }

        const {_id,...resBody}= req.body;

        const UpdateProduct = await ProductModel.findByIdAndUpdate(_id,resBody)

        res.status(200).json({
            message:"Update successfully!",
            data:UpdateProduct,
            success:true,
            error:false,
            
        })

    }catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false,
        })
    }
}

module.exports = UpdateProduct