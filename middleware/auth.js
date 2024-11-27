const jwt = require('jsonwebtoken')
const UserModel = require('../models/User');

const checkUserAuth = async (req, res, next) => {
    // console.log("middleware");
    const { token } = req.cookies
    // console.log(token);
    if (!token) {
        res.status(401).json({
            status: "failed",
            message: "Unauthorised Login",
        });
    } else {
        const data = jwt.verify(token, "kanchan123456789gangil")
        const userdata = await UserModel.findOne({ _id: data.ID })
        // console.log(userdata);
        // console.log(data);
        req.userdata = userdata

        next()
    }
}

module.exports = checkUserAuth