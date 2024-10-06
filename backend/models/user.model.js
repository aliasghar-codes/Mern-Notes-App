import mongoose from "mongoose";
import validator from "validator"

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: () => `Please provide valid email!`
        },
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);