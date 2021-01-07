import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'product'+ Date.now(),
      brand: 'brand',
      category: 'category',
      imageUrl: ['/images/products/tote1.jpg'],
      description: 'description',
      color: 'black',
      material: 'canvas',
      price: 0,
      rating: 0,
      numReviews: 0,
      countInStock: 0,
    });
    const createdProduct = await product.save();
    res.send({ message: "New Product Created", product: createdProduct });
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
      product.name = req.body.name;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.material = req.body.material;
      product.color = req.body.color;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl,
      product.countInStock = req.body.countInStock;
      product.price = req.body.price;
    
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found'});
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deletedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
