import { OrderModel } from '../order'

const order = new OrderModel()

describe("Order Model", () => {

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  it('create method should create new order with new associated order_product', async () => { 
    const order_product = {"product_id":1,"quantity": 1,"order_id":undefined}
    const result = await order.create("active",1,[order_product])
    expect(result).toEqual([])
  })
});