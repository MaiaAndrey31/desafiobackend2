import express from 'express';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import { connectDB } from './config/database';

const app = express();


app.use(express.json());


connectDB();


app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);

export default app;
