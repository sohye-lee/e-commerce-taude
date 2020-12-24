import React from 'react';
import './ProductList.css';
import Product from './Product/ProductComponent';

function ProductList({products}) {

    const renderItems = (products) => {
        return products.map(product => (
            <Product 
                key={product._id}
                product={product}
            />
        ))
    }

    return (
        <div className="productList__container">
            {renderItems(products)}
        </div>
    );

}


export default ProductList;