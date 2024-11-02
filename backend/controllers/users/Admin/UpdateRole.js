const UserModel = require("../../../models/UserModel");

async function UpdateRoleController(req, res) {
    try {
        const sessionUser = req.userId;

        const { userId , email, name, role} = req.body

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const user = await UserModel.findById(sessionUser);
        console.log("Roleuser", user.role);

        const UpdateRole = await UserModel.findByIdAndUpdate(userId,payload);

        res.status(200).json({
            message: "Update role successfully!",
            data: UpdateRole,
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

module.exports = UpdateRoleController;
