const UserModel = require("../models/User");
const imagesUpload = require("../middlewares/uploadMiddleware")

exports.dashboard = async(req, res) => {
    const user = req.user;
    try {
        const userId = await UserModel.findById(user.userId);
        const name = userId.name || "anonymous";
        res.status(200).send({message: `Hello ${name}`})

    } catch(err) {
        console.error(err.message);
        res.status(400).send({error: "cannot display dashboard right now"})
    }
}

exports.updateProfile = async(req, res) => {
    const user = req.user;
    const imagesUpload = req.file ? req.file.filename : ''; 
    try {
        const { name, email, password } = req.body;

        const updatedData = {
            name: name,
            email: email || user.email,
            password: password || user.password,
            profileImage: imagesUpload || user.profileImage,
        };

        const updatedUser = await UserModel.findByIdAndUpdate(
            user.userId,
            updatedData,
            { new: true }
        ).select('-password') //exclude password field

        if (!updatedUser) {
            return res.status(404).send({ error: "User not found" });
        }

        res.status(200).send({ message: "User data updated", user: updatedUser });

    } catch(err) {
        console.error(err.message);
        res.status(400).send({error: "Cannot Update Profile Right Now"})
    }
}