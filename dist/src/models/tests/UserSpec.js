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
const user_1 = require("../user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user = new user_1.UserModel();
let user_obj;
describe("User Model", () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    it('create method should add a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        user_obj = yield user.create("firstName", "lastName", "password");
        var compare_pass = bcrypt_1.default.compareSync("password" + process.env.BCRYPT_PASSWORD, user_obj.password);
        expect(compare_pass).toEqual(true);
        expect(user_obj).toEqual({
            id: 6,
            firstname: "firstName",
            lastname: "lastName",
            password: user_obj.password
        });
    }));
    it('show method should return user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.show(6);
        expect(result).toEqual(user_obj);
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.index();
        expect(result.length).toEqual(6);
    }));
});
