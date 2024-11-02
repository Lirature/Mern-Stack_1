const UserModel = require("../../models/UserModel");

async function userCurrentController(req, res) {
    try {
        console.log("userId", req.userId);
        const user = await UserModel.findById(req.userId);
        
        res.status(200).json({
            message: "User is current",
            data: user,
            error: false,
            success: true,
        });
        console.log("User", user);
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}
module.exports = userCurrentController;
