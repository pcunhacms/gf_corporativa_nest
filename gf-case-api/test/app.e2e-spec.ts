import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('API E2E', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve registrar um usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Pedro',
        email: `pedro${Date.now()}@test.com`,
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toContain('@test.com');
  });

  it('deve realizar login', async () => {
    const email = `login${Date.now()}@test.com`;

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Pedro',
        email,
        password: '123456',
      });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password: '123456',
      });

    token = response.body.access_token;

    expect(response.status).toBe(201);
    expect(token).toBeDefined();
  });

  it('deve criar categoria autenticado', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alimentação',
        description: 'Vale refeição',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Alimentação');
  });

  it('não deve criar categoria sem token', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({
        name: 'Transporte',
      });

    expect(response.status).toBe(401);
  });

  it('deve retornar dashboard', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty(
      'balance',
    );

    expect(response.body).toHaveProperty(
      'totalIncome',
    );

    expect(response.body).toHaveProperty(
      'totalExpense',
    );

    expect(response.body).toHaveProperty(
      'topCategories',
    );
  });
});