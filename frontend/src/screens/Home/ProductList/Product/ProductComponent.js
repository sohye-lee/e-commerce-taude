import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
import Rating from '../../../../components/Rating';
import { getReviews } from '../../../../actions/reviewActions';
import { useDispatch, useSelector } from 'react-redux';

function Product({product})  {
    const dispatch = useDispatch();
    const reviewList = useSelector(state => state.reviewList);
    const {reviews } = reviewList;
    const reviewsToShow = reviews? reviews.filter(review => review.product === product._id) : [] ;
    const numReviews = reviewsToShow ? reviewsToShow.length : 0;
    const rating = reviewsToShow? (reviewsToShow.reduce((a,b) => a + b.rating, 0) / reviewsToShow.length) : 0;
  
    useEffect(() => {
      dispatch(getReviews());
    }, [dispatch]);

    return (
        <div className="product__box" key={product._id}>
            <Link to={`/product/${product._id}`} className="product__imageBox"> 
                <img className="product__image" src={product.imageUrl[0]} alt={product.name} />
            </Link>
            <div className="product__description">
                <Link to={`/product/${product._id}`}> 
                    <h2 className="product__title">{product.name}</h2>
                </Link>
                <div className="product__ratings">
                    <Rating 
                        rating={rating}
                        numReviews={numReviews}
                    />
                </div>
                <h5 className="product__price">$ {product.price}</h5>
            </div>
        </div>
    )
}

export default Product;