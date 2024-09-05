# **Desafio Backend 2 - Autenticação de Usuário e Listagem de Produtos**

Este projeto implementa uma API RESTful utilizando **Node.js** com **TypeScript**, **MongoDB** via **Mongoose**, e autenticação com **JWT**. A API permite o cadastro de usuários, autenticação via login, e oferece rotas protegidas para listagem de produtos, com suporte a paginação e controle de taxa de requisições (**Rate-Limiting**).

---

## 🛠️ **Tecnologias Utilizadas**
- **Node.js**: Runtime para execução de JavaScript no servidor.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB.
- **JWT (JSON Web Token)**: Para autenticação e proteção de rotas.
- **Express.js**: Framework para construção de APIs.
- **Jest**: Framework de testes unitários.
- **Docker**: Para containerizar a aplicação.
- **Insomnia**: Para testar as rotas da API.

---

## 🚀 **Instalação e Configuração**

### **Passo 1: Clonar o Repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd desafiobackend2
```

### **Passo 2: Configurar o Arquivo `.env`**
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```plaintext
MONGO_URI=mongodb://mongo:27017/mydb
JWT_SECRET=supersecretkey
PORT=3000
```

> O **`MONGO_URI`** é configurado para usar o MongoDB rodando no container Docker, por isso está apontando para `mongo`.

### **Passo 3: Docker - Subir a Aplicação**
O projeto utiliza Docker e **Docker Compose** para facilitar o setup. Para rodar a aplicação, siga os seguintes passos:

#### **Comandos para Rodar a API com Docker**:

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Compilar o código TypeScript:
   ```bash
   npm run build

 ### **Após isso Rodar os comandos para criar os Containers e iniciar a API no Docker**

1. **Construir os containers**:
   ```bash
   docker-compose build
   ```

2. **Subir os containers (em background)**:
   ```bash
   docker-compose up -d
   ```

3. **Verificar os logs dos containers**:
   ```bash
   docker-compose logs -f
   ```


### **Passo 4: Acessar a API**
A aplicação estará rodando em: `http://localhost:3000`.

---
### **Rodar os Testes Unitários**
```bash
npm run test
```

---

## 📦 **Estrutura do Projeto**

```plaintext
project-root/
├── src/
│   ├── config/               # Configuração do banco de dados MongoDB
│   │   └── database.ts
│   ├── controllers/          # Lógica dos controladores de autenticação e produtos
│   │   ├── authController.ts
│   │   └── productController.ts
│   ├── middlewares/          # Middlewares para autenticação e rate-limiting
│   │   ├── authMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   └── rateLimitMiddleware.ts
│   ├── models/               # Modelos Mongoose para o MongoDB
│   │   ├── userModel.ts
│   │   └── productModel.ts
│   ├── routes/               # Rotas de autenticação e produtos
│   │   ├── authRoutes.ts
│   │   └── productRoutes.ts
│   ├── tests/                # Testes unitários com Jest
│   │   ├── auth.test.ts
│   │   └── product.test.ts
│   ├── utils/                # Utilitários para JWT
│   │   └── jwtUtils.ts
│   ├── app.ts                # Arquivo principal da aplicação
│   └── server.ts             # Inicialização do servidor
├── docker-compose.yml         # Configuração Docker Compose
├── Dockerfile                 # Configuração Docker
├── jest.config.js             # Configuração Jest
├── package.json               # Dependências e scripts npm
└── tsconfig.json              # Configuração TypeScript
```

---

## 🛡️ **Autenticação**

As rotas protegidas da API utilizam autenticação baseada em **JWT**. Para acessar essas rotas, é necessário passar um token JWT válido no cabeçalho da requisição.

### **Exemplo de Autenticação:**

1. **Registrar Usuário (Rota Pública)**
   ```http
   POST /api/auth/register
   ```

   - **Body**:
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

   - **Resposta Esperada**:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

2. **Login (Rota Pública)**
   ```http
   POST /api/auth/login
   ```

   - **Body**:
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

   - **Resposta Esperada**:
     ```json
     {
       "token": "JWT_TOKEN_AQUI"
     }
     ```

3. **Acessar Produtos (Rota Protegida)**:
   - Para acessar a rota de listagem de produtos, use o token JWT gerado durante o login no cabeçalho da requisição.

   ```http
   GET /api/products
   ```

   - **Headers**:
     ```plaintext
     Authorization: Bearer JWT_TOKEN_AQUI
     ```

   - **Resposta Esperada**:
     ```json
     [
       {
         "_id": "123456",
         "name": "Produto 1",
         "description": "Descrição do Produto 1",
         "price": 100.00
       },
       ...
     ]
     ```

---

## 🧪 **Testando as Rotas com Insomnia**

Para testar as rotas no **Insomnia**, siga os passos abaixo:

1. **Configurar uma Requisição de Registro**:
   - Método: `POST`
   - URL: `http://localhost:3000/api/auth/register`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Configurar uma Requisição de Login**:
   - Método: `POST`
   - URL: `http://localhost:3000/api/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

3. **Configurar Requisição para Listagem de Produtos (Protegida)**:
   - Método: `GET`
   - URL: `http://localhost:3000/api/products`
   - Headers:
     ```plaintext
     Authorization: Bearer JWT_TOKEN_AQUI
     ```

---

## 🔥 **Conclusão**

Esta API fornece uma solução completa para autenticação e listagem de produtos, com suporte a autenticação JWT, armazenamento no MongoDB, e fácil setup utilizando Docker. Você pode testar a API via **Insomnia** ou qualquer cliente HTTP como **Postman**.

Se houver qualquer problema ou dúvida, fique à vontade para contribuir ou abrir uma **issue** no repositório!

---

## 📝 **Comandos Docker Recapitulados**

- **Construir o projeto**:
  ```bash
  docker-compose build
  ```

- **Subir a aplicação em containers**:
  ```bash
  docker-compose up -d
  ```

- **Parar e remover os containers**:
  ```bash
  docker-compose down
  ```

- **Verificar os logs do container**:
  ```bash
  docker-compose logs -f
  ```
