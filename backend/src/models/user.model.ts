import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function(this: { authType: string }) {
            return this.authType === 'local';
        }
    },
    authType: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    googleId: {
        type: String,
        sparse: true
    },
}, { timestamps: true })

const User = mongoose.model("user", userSchema);

export default User