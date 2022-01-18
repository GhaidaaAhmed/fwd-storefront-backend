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
exports.OrderModel = void 0;
const database_1 = require("../database");
const pg_format_1 = __importDefault(require("pg-format"));
class OrderModel {
    create(status, user_id, order_products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING id';
                const result = yield (0, database_1.db_query_with_params)(sql, [status, user_id]);
                let formated_order_products = [];
                order_products.forEach((order_product) => formated_order_products.push([
                    order_product.product_id,
                    order_product.quantity,
                    result.rows[0].id
                ]));
                const inserted_order_products = yield (0, database_1.db_query)((0, pg_format_1.default)('INSERT INTO order_products (product_id, quantity, order_id) VALUES %L', formated_order_products));
                return inserted_order_products.rows;
            }
            catch (err) {
                throw new Error(`Could not create order. Error: ${err}`);
            }
        });
    }
}
exports.OrderModel = OrderModel;
