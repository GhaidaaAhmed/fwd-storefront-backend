"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const order = new order_1.OrderModel();
describe("Order Model", () => {
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
});
