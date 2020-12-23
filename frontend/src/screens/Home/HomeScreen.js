import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import ProductList from '../../components/ProductList/ProductListComponent';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './HomeScreen.css';

const HomeScreen = () => {
    const dispatch = useDispatch(); 
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    console.log(productList);
    
    useEffect(() => {
        dispatch(listProducts());
    },[dispatch])

    return (
        <div className="home__container">
            {loading?  <LoadingBox />
            : error? <MessageBox variant="danger">{error}</MessageBox>
            : <ProductList products={products}/>}
        </div>
    );
}

export default HomeScreen;