import { User } from '../../models/user'
import supertest from 'supertest'
import app from '../../server'
import jwt from 'jsonwebtoken'
import { Product } from '../../models/product'

const request = supertest(app)
let user: User,product:Product,token:string = ''

beforeAll(async () => {
    await request.post('/users')
    .send({
      "firstName" : "user",
      "lastName": "last",
      "password": "password"
    }).then((response) => {
      token = response.body;
      const decoded_jwt = jwt.verify(token, process.env.TOKEN_SECRET as string)
      user = decoded_jwt.user
    });
    
    await request.post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "name" : "new product",
      "price": 250
    }).then((response) => {
        product = response.body;
    });

    await request.post('/orders')
    .set('Authorization', `Bearer ${token}`)
    .send({
      status: "active",
      user_id:user.id,
      order_products:[{
        "product_id":product.id,
        "quantity": 1
      }]
    })


});

describe("Dashboard Endpoint", () => {
  it('should add a new order', async () => { 
    const response = await request.get(`/users/${user.id}/orders`)
    .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200);
  })

});