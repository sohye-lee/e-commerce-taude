import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import data from '../data.js';
import { isAuth } from '../utils.js';

const reviewRouter = express.Router();

reviewRouter.get('/seed',
    expressAsyncHandler(async(req, res) => {
        const createdReviews = await Review.insertMany(data.reviews);
        res.send(createdReviews);
    })
);

reviewRouter.get(
    '/',
    expressAsyncHandler(async(req, res) => {
        const reviews = await Review.find({}).populate('user','name');
        if (reviews) {
            res.send(reviews);
        } else {
            res.status(404).send({ message: 'No Reviews'});
        }
    })
);

reviewRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const review = new Review({
            product: req.body.product,
            user: req.body.user,
            rating: req.body.rating,
            text: req.body.text
        });
        const createdReview = await review.save();
        res.send({ message: 'Review Created', review: createdReview});
    })
);

export default reviewRouter;