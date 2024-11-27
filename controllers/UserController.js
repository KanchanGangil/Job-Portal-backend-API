const UserModel = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

    static getUser = async (req, res) => {
        try {
            const { id } = req.userdata
            const data = await UserModel.findById(id);
            res.status(200).json(data)

        } catch (error) {
            console.log(error);
            res.status(400)
                .json({ status: "failed", message: error.message })
        }
    }

    static registerUser = async (req, res) => {
        try {
            const { name, email, password, confirmpassword, phone, role } = req.body
            const user = await UserModel.findOne({ email: email })
            if (user) {
                res.status(401).json({
                    status: "failed",
                    message: "Email already exists",
                });
            } else {
                if (name && email && password && confirmpassword && role && phone) {
                    if (password == confirmpassword) {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const result = new UserModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            role: role,
                            phone: phone,
                        })
                        await result.save()
                        // console.log(result);
                        //generate token
                        const token = jwt.sign({ userId: result._id, email: result.email }, 'kanchan123456789gangil')
                        // console.log(token);
                        res.cookie('token', token)
                        res.status(201).json({
                            status: "success",
                            message: "Thanks for Registration  😃🍻",
                        });
                    } else {
                        res.status(401).json({
                            status: "failed",
                            message: "password and confirmpassowrd do not match",
                        });
                    }
                } else {
                    res.status(401).json({
                        status: "failed",
                        message: "All fields are required",
                    });
                }
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "failed",
                message: "Internal server error",
            });
        }
    }

    static login = async (req, res) => {
        try {
            const { email, password, role } = req.body
            if (email && password && role) {
                const user = await UserModel.findOne({ email: email })
                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)
                    if (isMatched) {
                        if (user.role == role) {
                            //token get
                            const token = jwt.sign({ ID: user._id }, 'kanchan123456789gangil')
                            // console.log(token);
                            res.cookie('token', token)
                            res.status(201).json({
                                status: "success",
                                message: "Login Ok Report  😃🍻",
                                token: token, user
                            });
                        } else {
                            res.status(401).json({
                                status: "failed",
                                message: "User with this role not found",
                            });
                        }
                    } else {
                        res.status(401).json({
                            status: "failed",
                            message: "Email or Password is not same",
                        });
                    }
                } else {
                    res.status(401).json({
                        status: "failed",
                        message: "You are not a registered user",
                    });
                }
            } else {
                res.status(401).json({
                    status: "failed",
                    message: "All fields are required",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    static logout = async (req, res) => {
        try {
            res.status(201)
                .cookie("token", "", {
                    httpOnly: true,
                    expires: new Date(Date.now())
                })
                .json({
                    success: true,
                    message: "logged Out Successfully"
                })

        } catch (error) {
            console.log(error);
        }
    }



}
module.exports = UserController