import { Request, Response } from 'express';
import { Product } from '../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  try {
    const products = await Product.find()
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};
