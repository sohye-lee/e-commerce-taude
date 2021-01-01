import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './AdminProductUpdate.css';

export default function AdminProductUpdateScreen(props) {
    const productId = props.match.params.id;

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(['/images/no-image.jpg'])
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!product || product._id !== productId) {
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
    }, [dispatch, product, productId]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="form__container">
            <div className="form__content">
                <form className="form admin__form__box" onSubmit={handleSubmit}>
                    <h1 className="form__title">Edit Product <span style={{fontStyle: 'italic', marginLeft: '1rem'}}>{name}</span></h1>
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
                            <label htmlFor="imageUrl">NAME</label>
                            <input 
                                type="text" 
                                id="imageUrl" 
                                placeholder="image" 
                                value={imageUrl[0]}
                                required 
                                onChange={e=> setImageUrl(e.target.value)} 
                            />
                        </div>
                            {product.imageUrl.length>1
                            ? 
                            product.imageUrl.map(
                                image => (
                                    <div className="row admin__form">
                                        <label htmlFor={`imageUrl${product.imageUrl.indexOf(image)}`}></label>
                                        <input 
                                            type="text" 
                                            id={`imageUrl${product.imageUrl.indexOf(image)}`} 
                                            placeholder="image" 
                                            value={image} 
                                            required 
                                            // onChange={e=> setImageUrl(e.target.value)} 
                                        />
                                    </div>)
                            )
                            :(<></>)}
                        
                        <button type="submit" className="btn">UPDATE</button>
                    </>
                    )}
                </form>
            </div>
        </div>
    )
};
