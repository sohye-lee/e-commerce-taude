import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
import ReactStars from 'react-rating-stars-component';

const Product = ({product}) =>  (
    <div className="product__box" key={product._id}>
        <Link to={`/product/${product._id}`} className="product__imageBox"> 
            <img className="product__image" src={product.imageUrl[0]} alt={product.name} />
        </Link>
        <div className="product__description">
            <Link to={`/product/${product._id}`}> 
                <h2 className="product__title">{product.name}</h2>
            </Link>
            <div className="product__ratings row">
                <ReactStars 
                    count={5}
                    value={product.rating}
                    size={15}
                    activeColor="#ffd700"
                    edit={false}
                />
                <span style={{marginLeft: 10}}> {product.numReviews + (product.numReviews>0? " reviews" : " review")}</span>
            </div>
            <h5 className="product__price">$ {product.price}</h5>
        </div>
    </div>
)

export default Product;