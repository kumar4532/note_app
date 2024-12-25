import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
    },
    content: {
        type: String
    }
}, { timestamps: true })

const Note = mongoose.model("note", noteSchema);

export default Note;