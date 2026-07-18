const request = require("supertest");
const app = require('../index');

describe('Calculator API', () => {
  
  test('adds 2 + 3', async () => {
    const res = await request(app).get('/add/2/3');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test('subtracts 10 - 4', async () => {
    const res = await request(app).get('/subtract/10/4');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(6);
  });

  test('multiplies 3 * 7', async () => {
    const res = await request(app).get('/multiply/3/7');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(21);
  });

  test('divides 10 / 2', async () => {
    const res = await request(app).get('/divide/10/2');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test('handles division by zero', async () => {
    const res = await request(app).get('/divide/4/0');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Division by zero");
  });
});