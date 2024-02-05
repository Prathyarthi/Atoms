import zod from 'zod'
import { User } from '../models/userModel.js';
import jwt from "jsonwebtoken";
import { config } from 'dotenv';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
config();


const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})


const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {

        const signupParsed = signupSchema.safeParse(req.body)

        if (!signupParsed.success) {
            return res.status(400).json({
                success: false,
                message: "Every field is required "
            });
        }

        const userExists = await User.findOne({
            email
        })

        if (userExists) {
            return res.status(409).send("User already exists")
        }

        const user = await User.create({
            email,
            password,
            firstName,
            lastName
        })

        console.log("User created");
        if (!user) {
            return res.status(500).send("Server Error")
        }

        const userId = user._id

        const token = jwt.sign({
            userId,
            role: user.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            token: token,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: `Account already exist with the provided email ${email}`
        });
    }
};


const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})

const signin = async (req, res) => {
    const { email, password } = req.body;

    const signinParsed = signinSchema.safeParse(req.body)

    if (!signinParsed.success) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        const userExists = await User.findOne({
            email
        })

        const validPassword = await userExists.comparePassword(password)
        if (!validPassword) {
            return res.status(401).send("Password is incorrect")
        }

        if (!userExists) {
            return res.status(401).send("User doesn't exist")
        }

        const token = jwt.sign({
            userId: userExists._id,
            role: userExists.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            userExists
        })
        return
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const getUser = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).select("-password");

        if (!user) {
            throw new ApiError(400, "user doesn't exists")
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token")

        res.json(
            new ApiResponse(200, "Logout successfull")
        )
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}

export {
    signup,
    signin,
    getUser,
    logout
}