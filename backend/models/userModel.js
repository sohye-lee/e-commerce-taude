import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        },
        isSeller: {
            type: Boolean,
            default: false,
            required: true
        },
        sellerId: {
            type: Number,
            required: false
        }
    }, 
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;