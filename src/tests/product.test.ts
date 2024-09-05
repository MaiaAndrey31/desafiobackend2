import request from 'supertest';
import app from '../app';
import { connectDB, disconnectDB } from '../config/database';

let token: string;

beforeAll(async () => {
  await connectDB();

  const res = await request(app).post('/api/auth/login').send({
    email: 'test@example.com',
    password: 'password123',
  });
  token = res.body.token;
});

afterAll(async () => {
  await disconnectDB();
});

describe('Product API', () => {
  it('should get products successfully with authentication', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should fail to get products without authentication', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(401);
  });
});
