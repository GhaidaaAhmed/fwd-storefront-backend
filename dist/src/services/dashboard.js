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
exports.DashboardQueries = void 0;
const database_1 = require("../database");
class DashboardQueries {
    getUserOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT orders.id, orders.status, order_products.quantity
        FROM orders
        JOIN order_products ON orders.id=order_products.order_id
        where orders.user_id = ($1) and status = 'active')`;
                const result = yield (0, database_1.db_query_with_params)(sql, [user_id]);
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get orders: ${err}`);
            }
        });
    }
}
exports.DashboardQueries = DashboardQueries;
