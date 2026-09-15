import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import http from "node:http";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";

process.env.JWT_SECRET = "test-secret";

let mongoServer;
let server;
let baseUrl;

const request = async (path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const body = await response.json();
  return { body, status: response.status };
};

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
});

test("authenticated finance workflow persists metadata and protects demo generation", async () => {
  const email = `test-${Date.now()}@example.com`;
  const credentials = {
    name: "API Test User",
    email,
    password: "Password123!",
  };

  const registration = await request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  assert.equal(registration.status, 201);

  const login = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password: credentials.password }),
  });
  assert.equal(login.status, 200);
  assert.ok(login.body.token);

  const headers = { Authorization: `Bearer ${login.body.token}` };
  const expense = await request("/api/expenses", {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: "Test groceries",
      amount: 1500,
      category: "Food",
      date: new Date().toISOString(),
      paymentMethod: "Card",
      notes: "API test expense",
    }),
  });
  assert.equal(expense.status, 201, JSON.stringify(expense.body));
  assert.equal(expense.body.expense.paymentMethod, "Card");
  assert.equal(expense.body.expense.notes, "API test expense");

  const invalidExpense = await request("/api/expenses", {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: "Invalid expense",
      amount: -10,
      category: "Food",
      date: new Date().toISOString(),
    }),
  });
  assert.equal(invalidExpense.status, 400);

  const budget = await request("/api/users/budget", {
    method: "PUT",
    headers,
    body: JSON.stringify({ monthlyBudget: 30000 }),
  });
  assert.equal(budget.status, 200);
  assert.equal(budget.body.user.monthlyBudget, 30000);

  const dashboard = await request("/api/dashboard", { headers });
  assert.equal(dashboard.status, 200);
  assert.equal(dashboard.body.monthlyBudget, 30000);
  assert.equal(dashboard.body.monthlySavingsRate, 0);
  assert.equal(dashboard.body.budgetAlert, "on-track");

  const demo = await request("/api/demo-data", {
    method: "POST",
    headers,
    body: JSON.stringify({}),
  });
  assert.equal(demo.status, 201);
  assert.deepEqual(demo.body.created, { income: 2, expenses: 4 });

  const duplicateDemo = await request("/api/demo-data", {
    method: "POST",
    headers,
    body: JSON.stringify({}),
  });
  assert.equal(duplicateDemo.status, 409);
});
