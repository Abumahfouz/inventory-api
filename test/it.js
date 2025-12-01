const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Product = require("../models/productModel");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Product.deleteMany();
});

describe("Product API", () => {
  it("GET /api/v1/products → should return empty array initially", async () => {
    const res = await request(app).get("/api/v1/products");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/v1/products → should create a product", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send({ name: "Sample", price: 20, category: "Books", inStock: true });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Sample");
  });
  it("GET /api/v1/products/:id → should return product by ID", async () => {
    const product = await Product.create({ name: "Test", price: 50 });
    const res = await request(app).get(`/api/v1/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Test");
  });
  it("PUT /api/v1/products/:id → should update a product", async () => {
    const product = await Product.create({ name: "Old", price: 10 });
    const res = await request(app)
      .put(`/api/v1/products/${product._id}`)
      .send({ price: 99 });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(99);
  });

  it("DELETE /api/v1/products/:id → should delete product", async () => {
    const product = await Product.create({ name: "ToDelete", price: 5 });
    const res = await request(app).delete(`/api/v1/products/${product._id}`);
    expect(res.statusCode).toBe(204);
  });
});
