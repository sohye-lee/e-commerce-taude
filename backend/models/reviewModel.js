import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        product: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: { type: String, required: true },
        rating: { type: Number, required: true },
        createdAt: { type: Date }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;