import { ProductStore } from '../product';
import supertest from 'supertest'
import app from '../../server'

const product = new ProductStore(),
request = supertest(app)
let token:string = ''

beforeAll((done) => {
  request.post('/users')
    .send({
      "firstName" : "user",
      "lastName": "last",
      "password": "password"
  }).end((err: any, response:any) => {
      token = response.body;
      done();
    });
});

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(product.create).toBeDefined();
  });

  it('create method should add a product', async () => { 
    const response = await request.post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "new product",
      "price":250
    })
    expect(response.body).toEqual({
      id: 1,
      name: 'new product',
      price: 250
    });
  })

  it('index method should return a list of products', async () => {
    const result = await product.index();
    expect(result).toEqual([{
      id: 1,
      name: 'new product',
      price: 250
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await product.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'new product',
      price: 250
    });
  });
});