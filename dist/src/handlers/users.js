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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify_auth_token_1 = __importDefault(require("../../middleware/verify_auth_token"));
const user = new user_1.UserModel();
const index = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user.index();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user_obj = yield user.show(id);
        res.json(user_obj);
    }
    catch (err) {
        next(err);
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password } = req.body;
        const new_user = yield user.create(firstName, lastName, password);
        var secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'secret', token = jsonwebtoken_1.default.sign({ user: {
                id: new_user.id,
                firstname: new_user.firstname,
                lastname: new_user.lastname
            } }, secret);
        res.json(token);
    }
    catch (err) {
        next(err);
    }
});
const userRoutes = (app) => {
    app.get('/users', verify_auth_token_1.default, index);
    app.get('/users/:id', verify_auth_token_1.default, show);
    app.post('/users', create);
};
exports.default = userRoutes;
