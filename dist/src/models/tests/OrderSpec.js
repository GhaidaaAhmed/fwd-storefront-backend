"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const order = new order_1.OrderModel();
describe("Order Model", () => {
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('create method should create new order with new associated order_product', () => __awaiter(void 0, void 0, void 0, function* () {
        const order_product = { "product_id": 1, "quantity": 1, "order_id": undefined };
        const result = yield order.create("active", 1, [order_product]);
        expect(result).toEqual([]);
    }));
});
