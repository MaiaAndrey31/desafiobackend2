import express from 'express';
import { getProducts } from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { apiLimiter } from '../middlewares/rateLimitMiddleware';

const router = express.Router();

router.get('/products', authMiddleware, apiLimiter, getProducts);

export default router;
