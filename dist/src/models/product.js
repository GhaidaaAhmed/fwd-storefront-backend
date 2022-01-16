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
exports.ProductStore = void 0;
const database_1 = require("../database");
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products';
                const result = yield (0, database_1.db_query)(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get the products. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield (0, database_1.db_query_with_params)(sql, [id]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find the product. Error: ${err}`);
            }
        });
    }
    create(name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
                const result = yield (0, database_1.db_query_with_params)(sql, [name, price]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create the product. Error: ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
