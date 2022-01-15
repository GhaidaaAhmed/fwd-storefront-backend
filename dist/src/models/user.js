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
exports.UserModel = void 0;
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PASSWORD, SALT_ROUNDS, } = process.env;
class UserModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users';
                const result = yield (0, database_1.db_query)(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get the users. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const result = yield (0, database_1.db_query_with_params)(sql, [id]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user. Error: ${err}`);
            }
        });
    }
    create(firstName, lastName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = SALT_ROUNDS ? Number(SALT_ROUNDS) : 10;
                const encrypted_password = bcrypt_1.default.hashSync(password + BCRYPT_PASSWORD, salt);
                const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
                const result = yield (0, database_1.db_query_with_params)(sql, [firstName, lastName, encrypted_password]);
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create user. Error: ${err}`);
            }
        });
    }
}
exports.UserModel = UserModel;
