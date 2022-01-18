import { ProductStore } from '../../models/product';
import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
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

describe("Product Endpoints", () => {

  it('add a new product', async () => { 
    const response = await request.post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name": "new product",
      "price":250
    })
    expect(response.body).toEqual({
      id: 3,
      name: 'new product',
      price: 250
    });
  })

  it('return a list of products', async () => {
    const result = await request.get('/products')
    expect(result.body).toEqual([{
      id: 1,
      name: 'new product',
      price: 250
    },{
      id: 2,
      name: 'new product',
      price: 250
    },{
      id: 3,
      name: 'new product',
      price: 250
    }]);
  });

  it('should return the correct product', async () => {
    const result = await request.get('/products/1')
    expect(result.body).toEqual({
      id: 1,
      name: 'new product',
      price: 250
    });
  });
});