import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { detailsProduct } from '../../actions/productActions';
import { deleteReview, editReview, getReviews, postReview } from '../../actions/reviewActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Rating from '../../components/Rating';
import { REVIEW_CREATE_RESET, REVIEW_EDIT_RESET } from '../../constants/reviewConstants';
import './ProductScreen.css'

function ReviewEditModal ({review}) {
  const [rating, setRating] = useState(review? review.rating: 0);
  const [text, setText] = useState(review? review.text: '');

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(editReview({
      _id: review._id,
      rating,
      text
    }))
  };
  return (
    <div className="modal__container" >
      <form className="modal form" onSubmit={handleSubmit}>
        <div className="form__review">
          <h3 className="review__title">Edit Review</h3>
          <div className="row">
            <ReactStars value={review.rating} size={22} count={5} onChange={e => setRating(e.target.value)}/>
          </div>
          <div className="row">
            <textarea className="review__text" value={text} rows="3" onChange={e => setText(e.target.value)}/>
          </div>
          <div className="row left">
            <button className="btn small" type="submit">update</button>
            <button className="btn small">cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const reviewList = useSelector(state => state.reviewList);
  const { loading: loadingReviews, error: errorReviews, success: successReviews, reviews } = reviewList;
  const reviewsToShow = reviews? reviews.filter(review => review.product === productId) : [] ;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin; 
  const reviewCreate = useSelector(state => state.reviewCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = reviewCreate;
  const reviewEdit = useSelector(state => state.reviewEdit);
  const { success: successEdit } = reviewEdit;
  const reviewDelete = useSelector(state => state.reviewDelete);
  const { success: successDelete } = reviewDelete;

  const [ showImageIndex, setShowImageIndex ] = useState(0);
  const numReviews = reviewsToShow ? reviewsToShow.length : 0;
  const rating = reviewsToShow? (reviewsToShow.reduce((a,b) => a + b.rating, 0) / reviewsToShow.length) : 0;
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState('');

  useEffect(() => {
    dispatch({ type: REVIEW_CREATE_RESET });
    dispatch({ type: REVIEW_EDIT_RESET });
    dispatch(detailsProduct(productId));
    dispatch(getReviews());
  }, [dispatch, productId, successCreate, successEdit, successDelete]);

  const handleAddToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const ratingChange = (newRating) => {
    setReviewRating(newRating);
  }
  const handleAddReview = (e) => {
    e.preventDefault();
    dispatch(postReview({
      product: productId,
      user: userInfo._id,
      rating: reviewRating,
      text: reviewText
    }))
  };

  const handleDeleteReview = (review) => {
    if (window.confirm('Are you sure you wish to delete the review?')) {
      console.log(review._id);
      dispatch(deleteReview(review._id));
    }
  };

  return (
    <div className="info__container container">
      <Link to="/"><div className="screen__goBack"><span><i className="fa fa-angle-left" /> BACK TO MAIN</span></div></Link>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="info__content">
                <div className="info__main">
                    <div className="info__imageBox">
                        <img src={product.imageUrl[showImageIndex]} className="info__image" alt={product.name}/>
                        <div className="info__imageCarousel">
                            {
                              [...Array(product.imageUrl.length).keys()].map((i) => 
                                <div className="info__smallImgBox"  key={i} onClick={() => setShowImageIndex(i)}>
                                      <img 
                                          src={product.imageUrl[i]} 
                                          className="info__smallImg" 
                                          alt={product.name+' image'}
                                      />
                                </div>
                              )
                          }
                        </div>
                    </div>
                    <div className="info__description">
                        <h2>{product.name}</h2>
                        <Rating
                          rating={rating}
                          numReviews={product.numReviews}
                        />
                        <h3>${product.price}</h3>
                        <h4><span className="head">Materials </span><br/> {product.material}</h4>
                        <h4><span className="head">Description </span><br/> {product.description}</h4>
                    </div>
                </div>
                <div className="info__right">
                  <div className="info__action">
                      <div className="info__seller row">
                          <h3>Seller</h3>
                      </div>
                      <div className="info__ratings row" style={{paddingLeft:0}}>
                          <Rating
                            rating={rating}
                            numReviews={numReviews}
                          />
                      </div>
                      <div className="row">
                          <h3>Price</h3>
                          <h3>${product.price}</h3>
                      </div>
                      <div className="row"> 
                          <h3>Status</h3>
                          <h3>{product.countInStock > 5 ? (<span className="skyblue">In Stock</span>) : product.countInStock > 0? (<span className="red">Only {product.countInStock} In Stock</span>): (<span className="red">Unavailable</span>)}</h3>
                      </div>
                      {
                          product.countInStock > 0 && (
                              <div>
                                  <div className="row" style={{margin: '2rem 0'}}>
                                      <label htmlFor="qty">Qty</label>
                                      <select 
                                          name="qty" 
                                          style={{color: 'black', fontSize:"1.8rem", height: '2.9rem', padding: '3px 10px'}} 
                                          onChange={e => setQty(e.target.value)}
                                          value={qty}
                                      >
                                          {
                                              [...Array(product.countInStock).keys()].map((x) => (
                                                  <option key={x+1} value={x+1}>{x+1}</option>
                                              ))
                                          }
                                      </select>
                                  </div>
                                  <div className="row center">
                                      <button onClick={handleAddToCart} className="btn">ADD TO CART</button>
                                  </div>
                              </div>
                          )
                      }
                      
                  </div>
                  <div className="info__reviews">
                      <h3 className="review__title">Customer's Reviews</h3>
                      {loadingReviews && <LoadingBox />}
                      {errorReviews && <MessageBox variant="error">{errorReviews}</MessageBox>}
                      {successReviews && reviewsToShow.length>0 ? (
                        reviewsToShow.map(review => (
                        <div key={review._id} className="review__item">
                          <div className="row" style={{padding: "0 8px"}}>
                            <ReactStars 
                              count={5}
                              value={review.rating}
                            />
                            <span > {review.rating}/5</span>
                          </div>
                          <h5 style={{fontWeight: "500"}}> Reviewed by {review.user.name} on {review.createdAt.substring(5,7)}/{review.createdAt.substring(8,10)}/{review.createdAt.substring(0,4)}</h5>
                          <h5>{review.text}</h5>
                          { userInfo && userInfo._id === review.user._id 
                          ? (<div className="row left">
                              <button className="btn small" onClick={() => {
                                setModalShow(true); 
                                setReviewToEdit(review._id);
                                }}>Edit</button>
                              <button className="btn small" onClick={() => handleDeleteReview(review)}>Delete</button>
                            </div>)
                          :<></>}
                          
                        </div>
                      )))
                      : 
                      (<div>No Review</div>)
                      }
                      {modalShow && (
                            <ReviewEditModal review={reviews.filter(review => review._id === reviewToEdit)[0]}/>
                      )}
                  </div>
                  {
                    userInfo 
                    ? (
                      <div className="info__reviews">
                        <div>
                          <h3 className="review__title" style={{paddingBottom: "15px", borderBottom: "1px solid var(--Gray)"}}>LEAVE YOUR REVIEW</h3>
                          <form onSubmit={handleAddReview} className="form__review">
                            <div className="row">
                              <ReactStars count={5} onChange={ratingChange} size={20} value={reviewRating} className="review__rating"/>
                            </div>
                            <div className="row">
                              <textarea rows="3" placeholder="Your review" className="review__text" required onChange={(e) => setReviewText(e.target.value)} value={reviewText}/>
                            </div>
                            <button type="submit" className="btn small">Add Review</button>
                          </form>
                        </div>
                      </div>
                    )
                    : (<></>)
                    }
                    {loadingCreate && <LoadingBox />}
                    {errorCreate && <MessageBox variant="error">{errorCreate}</MessageBox>}  
                </div>
                
            </div>
      )}
    </div>
  );
}
