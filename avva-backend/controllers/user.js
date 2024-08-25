const User = require('../models/user');

exports.userById = async (req, res, next, id) => {
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({
            error: 'User not found'
        })
    }

    req.profile = user;
    next();

}

exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile);
}

exports.update = (req, res) => {
    const userUpdatePromise = User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true }
    );

    userUpdatePromise
        .then((data) => {
            data.hashed_password = undefined
            data.salt = undefined
            return res.json(data);
        })
        .catch((err) => {
            return res.status(400).json({
                error: err || 'Something went wrong!'
            })
        })

}