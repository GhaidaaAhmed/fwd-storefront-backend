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
exports.OrderModel = void 0;
const database_1 = require("../database");
class OrderModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders';
                const result = yield (0, database_1.db_query)(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get all orders. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield (0, database_1.db_query_with_params)(sql, [id]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order. Error: ${err}`);
            }
        });
    }
    create(status, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
                const result = yield (0, database_1.db_query_with_params)(sql, [status, user_id]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create order. Error: ${err}`);
            }
        });
    }
}
exports.OrderModel = OrderModel;
