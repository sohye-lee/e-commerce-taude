import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../../node_modules/axios/index';
import { detailsProduct, updateProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
import './AdminProductEdit.css';

export default function AdminProductEditScreen(props) {
    const productId = props.match.params.id;

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState([]);
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successUpdate) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setCategory(product.category);
            setBrand(product.brand);
            setMaterial(product.material);
            setColor(product.color);
            setDescription(product.description);
            setImageUrl(product.imageUrl);
            setPrice(product.price);
            setCountInStock(product.countInStock);
        }
    }, [dispatch, product, productId, props.history, successUpdate]);

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const handleUploadFile = async (e) => {
        const numImages = e.target.files.length;
        const files = e.target.files ;
        const bodyFormData = new FormData();
        for (var i = 0; i<numImages; i++) {
            bodyFormData.append('image', files[i]);
        }
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            console.log(data);
            setImageUrl(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name, 
            category, 
            brand, 
            material, 
            color, 
            description, 
            imageUrl,
            price, 
            countInStock 
        }));
    };

    return (
        <div className="form__container">
            <div className="form__content">
                <form className="form admin__form__box" onSubmit={handleSubmit}>
                    <h1 className="form__title">Edit Product <span style={{fontStyle: 'italic', marginLeft: '1rem'}}>{name}</span></h1>
                    {loadingUpdate && <LoadingBox />}
                    {errorUpdate && <MessageBox variant="error">{error}</MessageBox>}
                    {loading ?  <LoadingBox />
                    : error ? <MessageBox variant="error">{error}</MessageBox>
                    : (
                    <>
                        <div className="row admin__form">
                            <label htmlFor="name">NAME </label>
                            <input 
                                type="text" 
                                id="name" 
                                placeholder="NAME" 
                                value={name}
                                required 
                                onChange={e=> setName(e.target.value)} 
                            />
                        </div>
                        <div className="row admin__form">
                            <label htmlFor="category">category</label>
                            <input 
                                type="text" 
                                id="category" 
                                placeholder="CATEGORY" 
                                value={category}
                                required 
                                onChange={e=> setCategory(e.target.value)} 
                            />
                        </div>
                        <div className="row admin__form">
                            <label htmlFor="brand">brand</label>
                            <input 
                                type="text" 
                                id="brand" 
                                placeholder="brand" 
                                value={brand}
                                required 
                                onChange={e=> setBrand(e.target.value)} 
                            />
                        </div>
                        <div className="row admin__form">
                            <label htmlFor="material">material</label>
                            <input 
                                type="text" 
                                id="material" 
                                placeholder="material" 
                                value={material}
                                required 
                                onChange={e=> setMaterial(e.target.value)} 
                            />
                        </div>
                        <div className="row admin__form">
                            <label htmlFor="color">color</label>
                            <input 
                                type="text" 
                                id="color" 
                                placeholder="color" 
                                value={color}
                                required 
                                onChange={e=> setColor(e.target.value)} 
                            />
                        </div>
                        <div className="row admin__form">
                            <label htmlFor="description">description</label>
                            <input 
                                type="text" 
                                id="description" 
                                placeholder="DESCRIPTION" 
                                value={description}
                                required 
                                onChange={e=> setDescription(e.target.value)} 
                            />
                        </div>
                        <div className="row admin__form">
                            <label htmlFor="price">PRICE</label>
                            <input 
                                type="text" 
                                id="price" 
                                placeholder="price" 
                                value={price}
                                required 
                                onChange={e=> setPrice(e.target.value)} 
                            />
                        </div>
                        <div className="row admin__form">
                            <label htmlFor="countInStock">Qty in Stock</label>
                            <input 
                                type="text" 
                                id="countInStock" 
                                placeholder="count(s) in stock" 
                                value={countInStock}
                                required 
                                onChange={e=> setCountInStock(e.target.value)} 
                            />
                        </div>
                        <div className="row admin__form">
                            <label htmlFor="imageFile1">IMAGES</label>
                            <input 
                                type="file" 
                                id="imageFile1" 
                                label="CHOOSE IMAGE"
                                onChange={handleUploadFile} 
                                multiple
                            />
                            {loadingUpload && <LoadingBox />}
                            {errorUpload && (<MessageBox variant="error">{errorUpload}</MessageBox>)}
                        </div>
                        <button type="submit" className="btn">UPDATE</button>
                    </>
                    )}
                </form>
            </div>
        </div>
    )
};
