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
const product_1 = require("../product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const product = new product_1.ProductStore(), request = (0, supertest_1.default)(server_1.default);
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
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield product.create('new product', 250);
        expect(response).toEqual({
            id: 4,
            name: 'new product',
            price: 250
        });
    }));
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.index();
        expect(result).toEqual([{
                id: 1,
                name: 'new product',
                price: 250
            },
            {
                id: 2,
                name: 'new product',
                price: 250
            },
            {
                id: 3,
                name: 'new product',
                price: 250
            },
            {
                id: 4,
                name: 'new product',
                price: 250
            }]);
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'new product',
            price: 250
        });
    }));
});
