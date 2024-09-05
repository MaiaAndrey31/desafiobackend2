import request from 'supertest';
import app from '../app';
import { connectDB, disconnectDB } from '../config/database';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('Auth API', () => {
  it('should register a user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);  // Certifica-se de que o usuário foi registrado com sucesso
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register a user with the same email', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser2',
      email: 'test@example.com',  // Email duplicado
      password: 'password123',
    });
    expect(res.statusCode).toEqual(400);  // Espera um erro 400 para email duplicado
    expect(res.body).toHaveProperty('error', 'User already exists');
  });
});
