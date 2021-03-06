import React from 'react';

export default function Rating(props) {
  const { rating, numReviews } = props;
  return (
    <div className="rating" style={{display:"flex", justifyContent: "space-between", alignItems: 'center'}}>
      <div className="rating__stars">
        <span>
          <i
            className={
              rating >= 1
                ? 'fa fa-star'
                : rating >= 0.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? 'fa fa-star'
                : rating >= 1.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? 'fa fa-star'
                : rating >= 2.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? 'fa fa-star'
                : rating >= 3.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? 'fa fa-star'
                : rating >= 4.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span style={{marginLeft: "5px"}}>
          {rating? rating.toFixed(1): 0}
        </span>
      </div>
      <div>{numReviews + ' reviews'}</div>
    </div>
  );
}
