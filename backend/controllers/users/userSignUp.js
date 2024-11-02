const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");

async function UserSignUpController(req, res) {
    try {
        const { name, email, password } = req.body;
        console.log("Check", name, email, password);
        const user = await UserModel.findOne({ email });

        console.log("Users", user);

        if (user) {
            throw new Error("User already exists!");
        }
        if (!name) {
            throw new Error("Please provide name");
        }
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong!");
        }

        const payload = {
            ...req.body,
            password: hashPassword,
            role: "MEMBER",
        };

        const datauser = new UserModel(payload);
        const saveuser = await datauser.save();

        res.status(201).json({
            data: saveuser,
            error: false,
            success: true,
            message: "User created successfully!",
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = UserSignUpController;
