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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const order = new order_1.OrderModel(), request = (0, supertest_1.default)(server_1.default);
let token = '';
beforeAll((done) => {
    request.post('/users')
        .send({
        "firstName": "user",
        "lastName": "last",
        "password": "password"
    }).end((err, response) => {
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
    it('create method should add a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({
            status: "active",
            user_id: 1
        });
        expect(response.body).toEqual({
            id: 1,
            status: "active",
            user_id: "1"
        });
    }));
    it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get('/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(result.body).toEqual([{
                id: 1,
                status: "active",
                user_id: "1"
            }]);
    }));
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get('/orders/1')
            .set('Authorization', `Bearer ${token}`);
        expect(result.body).toEqual({
            id: 1,
            status: "active",
            user_id: "1"
        });
    }));
});
