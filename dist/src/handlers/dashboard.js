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
const verify_auth_token_1 = __importDefault(require("../../middleware/verify_auth_token"));
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const getUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = Number(req.params.user_id);
        const user_orders = yield dashboard.getUserOrders(user_id);
        res.json(user_orders);
    }
    catch (err) {
        next(err);
    }
});
const dashboardRoutes = (app) => {
    app.get('/users/:user_id/orders', verify_auth_token_1.default, getUserOrders);
};
exports.default = dashboardRoutes;
