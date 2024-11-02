const UserModel = require("../models/UserModel")

async function PermissionController(userId){
    const user = await UserModel.findById(userId)

    if(user.role === "ADMIN"){
        return true
    }
    return false
}
module.exports = PermissionController
