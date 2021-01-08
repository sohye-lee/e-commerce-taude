import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../constants/productConstants';
import './AdminProductList.css';

export default function ProductListScreen(props) {
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    const productCreate = useSelector(state => state.productCreate);
    const { 
        loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate, 
        product: createdProduct 
    } = productCreate;
    const productDelete = useSelector(state => state.productDelete);
    const { 
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
          dispatch({ type: PRODUCT_CREATE_RESET });
          props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts());	  
      }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

    const handleDelete = (product) => {
        if (window.confirm(`Are you sure you wish to delete the product ${product.name}?`)) {
            dispatch(deleteProduct(product._id));
        }
    };

    const handleCreate = () => {
        dispatch(createProduct());
    };

    return (
        <div className="admin__container container">
            <Link to="/dashboard"><div className="screen__goBack"><span><i className="fa fa-angle-left" /> BACK TO DASHBOARD</span></div></Link>
            <div className="admin__content">
                <div className="admin__header row">
                    <h1 className="order__title">PRODUCTS</h1>
                    <button className="btn" type="button" onClick={handleCreate}>create product</button>
                </div>
                {loadingDelete && <LoadingBox />}
                {errorDelete && <MessageBox variant="error">{errorDelete}</MessageBox>}
                {loadingCreate && <LoadingBox />}
                {errorCreate && <MessageBox variant="error">{errorCreate}</MessageBox>}
                {loading? <LoadingBox/>:
                error? <MessageBox variant="error">{error}</MessageBox>
                : 
                (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className="table__id">ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className="table__id">{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand.toUpperCase()}</td>
                                    <td>
                                        <div className="table__btn">
                                            <button 
                                                type="button"
                                                className="btn small"
                                                onClick={() => props.history.push(`/product/${product._id}/edit`)}
                                            >
                                                EDIT
                                            </button>
                                            <button 
                                                type="button"
                                                className="btn small"
                                                onClick={() => handleDelete(product)}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
};
