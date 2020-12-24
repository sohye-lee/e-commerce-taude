import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Rating from '../../components/Rating';
// import ReactStars from 'react-rating-stars-component';
import './ProductScreen.css'

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  
  const [ showImageIndex, setShowImageIndex ] = useState(0);
 
  return (
    <div className="info__container">
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
                        {/* <div className="info__ratings row">
                            <ReactStars  
                                count={5}
                                value={product.rating}
                                size={15}
                                activeColor="#ffd700"
                                edit={false}
                            />
                            <span> {product.numReviews + (product.numReviews>0? " reviews" : " review")}</span>
                        </div> */}
                        <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}
                        />
                        <h3>${product.price}</h3>
                        <h4><span className="head">Materials </span><br/> {product.material}</h4>
                        <h4><span className="head">Description </span><br/> {product.description}</h4>
                    </div>
                </div>
                <div className="info__action">
                    <div className="info__seller row">
                        <h3>Seller</h3>
                        {/* <h3>{seller.name}</h3> */}
                    </div>
                
                    <div className="info__ratings row" style={{paddingLeft:0}}>
                        {/* <ReactStars 
                            count={5}
                            value={product.rating}
                            size={15}
                            activeColor="#ffd700"
                            edit={false}
                        />
                        
                        <h3> {product.numReviews + (product.numReviews>0? " reviews" : " review")}</h3> */}
                        <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}
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
            </div>
      )}
    </div>
  );
}
