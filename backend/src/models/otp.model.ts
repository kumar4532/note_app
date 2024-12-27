import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }
})

const Otp = mongoose.model("otp", otpSchema);

export default Otp