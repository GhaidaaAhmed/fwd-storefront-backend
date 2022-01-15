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
exports.db_query = exports.db_query_with_params = exports.Client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV } = process.env;
exports.Client = new pg_1.Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});
const db_query_with_params = (sql, params) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield exports.Client.connect();
    const result = yield conn.query(sql, params);
    conn.release();
    return result;
});
exports.db_query_with_params = db_query_with_params;
const db_query = (sql) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield exports.Client.connect(), result = yield conn.query(sql);
    conn.release();
    return result;
});
exports.db_query = db_query;
