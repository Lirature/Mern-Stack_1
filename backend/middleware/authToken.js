const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.Token
        // console.log("Token - ",token)
        
        if(!token){
            return res.status(200).json({
                message:"Please login...!",
                error:true,
                success:false,
            })
        }

        jwt.verify(token,process.env.TOKEN_SECRET_KEY,function(err,decoded){
            console.log("Err",err)
            console.log("decoded",decoded)

            if(err){
                console.log("Err",err)
            }

            req.userId = decoded?._id

            next()
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            sucess: false,
        });
    }
}

module.exports = authToken;
