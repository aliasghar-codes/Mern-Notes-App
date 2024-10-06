import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const userSignUp = async (req, res) => {

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill full form" });
    };

    try {

        const userFound = await User.findOne({ email });

        if (userFound) return res.status(400).json({ success: false, message: "User already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser);

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: process.env.COOKIE_EXPIRES,
            })
            .json({ success: true, user: newUser, message: "User registered successfully" });

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });

    }
}

export const userLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: false, message: "Please fill full form" });

    try {

        const foundUser = await User.findOne({ email });

        if (!foundUser) return res.status(400).json({ success: false, message: "Email or password is incorrect" });

        const passwordCheck = await bcrypt.compare(password, foundUser.password);

        if (email == foundUser.email && passwordCheck) {

            const token = generateToken(foundUser);

            return res
                .status(200)
                .cookie("token", token, {
                    maxAge: process.env.COOKIE_EXPIRES,
                    sameSite: "Strict",
                    httpOnly: true
                })
                .json({ success: true, user: foundUser, message: "User logged in successfully" });

        } else {
            return res.status(400).json({ success: false, message: "Email or password is incorrect." });
        }

    } catch (error) {

        console.log("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });

    }
}

export const getUser = async (req, res) => {

    const user = req.user;

    return res.status(200).json({ User: user, success: true, message: "User found" });
}

export const logOut = async (req, res) => {
    try {
        
        return res
            .status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
                httpOnly: true
            })
            .json({
                success: true,
                message: "User Logout successfully!"
            })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}