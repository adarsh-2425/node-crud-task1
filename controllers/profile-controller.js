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
        const User = await UserModel.findById(user.userId);

        // fetch new data
        const { name, email, password, profileImage } = req.body;

        User.name = name;
        User.email = email || User.email;
        User.password = password || User.password;
        User.profileImage = imagesUpload || user.profileImage;

        //findbyidandupdate
        

        // save book
        await User.save();
        res.status(201).send({message: "Userdata updated"})

    } catch(err) {
        console.error(err.message);
        res.status(400).send({error: "Cannot Update Profile Right Now"})
    }
}