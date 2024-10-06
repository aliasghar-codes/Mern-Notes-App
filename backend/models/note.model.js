import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        defualt: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false
    }

}, { timestamps: true });

export const Note = mongoose.model("Note", noteSchema);