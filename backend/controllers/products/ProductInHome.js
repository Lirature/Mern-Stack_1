const ProductModel = require("../../models/ProductModel")

async function ProductInHome(req,res){
    try{    

        const {Category} = req?.body || req?.query 
        // console.log("Product Category",Category)

        const ProductHome  = await ProductModel.find({Category})

        res.status(200).json({
            message:"Product Home",
            data:ProductHome,
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
module.exports = ProductInHome