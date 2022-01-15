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
const order_1 = require("../models/order");
const verify_auth_token_1 = __importDefault(require("../../middleware/verify_auth_token"));
const order = new order_1.OrderModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const order_obj = yield order.show(id);
        res.json(order_obj);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, user_id } = req.body;
        const new_order = yield order.create(status, user_id);
        res.json(new_order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const orderRoutes = (app) => {
    app.get('/orders', verify_auth_token_1.default, index);
    app.get('/orders/:id', verify_auth_token_1.default, show);
    app.post('/orders', verify_auth_token_1.default, create);
};
exports.default = orderRoutes;
