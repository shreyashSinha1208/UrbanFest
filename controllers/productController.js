// controllers/productController.js
import Product from '../models/product.js';
import Fuse from 'fuse.js';

const fuseOptions = {
    keys: ['name'],
    threshold: 0.4,
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate({
            path: 'review',
            populate: {
                path: 'author',
            },
        });
        res.send(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.send(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products by category' });
    }
};

export const searchProducts = async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }
    try {
        const products = await Product.find();
        const fuse = new Fuse(products, fuseOptions);
        const results = fuse.search(query).map(result => ({
            _id: result.item._id,
            name: result.item.name,
        }));
        res.json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
