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

reviewRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const review = await Review.findById(req.body._id);
        if (review) {
            review.rating = req.body.rating;
            review.text =req.body.text;

            const updatedReview = await review.save();
            res.send({ message: 'Review Updated', updatedReview });
        } else {
            res.status(404).send({ message: 'Review Not Found' });
        }
    })
);

reviewRouter.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const review = await Review.findById(req.params.id);
        if (review) {
            const deletedReview = await review.remove();
            res.send({ message: 'Review has been successfully deleted', review: deletedReview })
        } else {
            res.status(404).send({ message: 'Review Not Found' });
        }
    })
);

export default reviewRouter;