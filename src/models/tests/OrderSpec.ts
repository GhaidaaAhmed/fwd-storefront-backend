import { OrderModel } from '../order';
import supertest from 'supertest'
import app from '../../server'

const order = new OrderModel(),
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

describe("Order Model", () => {
  it('should have an index method', () => {
    expect(order.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(order.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  it('create method should add a new order', async () => { 
    const response = await request.post('/orders')
    .set('Authorization', `Bearer ${token}`)
    .send({
      status: "active",
      user_id:1
    })
    expect(response.body).toEqual({
      id: 1,
      status: "active",
      user_id:"1"
    });
  })

  it('index method should return a list of orders', async () => {
    const result = await request.get('/orders')
    .set('Authorization', `Bearer ${token}`)
   
    expect(result.body).toEqual([{
      id: 1,
      status: "active",
      user_id: "1"
    }]);
  });

  it('show method should return the correct order', async () => {
    const result = await request.get('/orders/1')
    .set('Authorization', `Bearer ${token}`)
   
    expect(result.body).toEqual({
      id: 1,
      status: "active",
      user_id: "1"
    });
  });
});