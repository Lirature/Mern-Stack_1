const UserModel = require("../../../models/UserModel");

async function Alluser(req, res) {
    try {
        console.log("All users", req.userId);
        const Alluser = await UserModel.find();

        res.json({
            message: "All user!",
            data: Alluser,
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

module.exports = Alluser;
