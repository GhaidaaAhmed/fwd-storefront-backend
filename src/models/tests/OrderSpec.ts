import { OrderModel } from '../order'

const order = new OrderModel()

describe("Order Model", () => {

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });
});