"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
const orders_1 = __importDefault(require("./handlers/orders"));
const error_1 = __importDefault(require("../middleware/error"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(error_1.default);
app.get('/', (req, res) => {
    res.send("Welcome");
});
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, dashboard_1.default)(app);
(0, orders_1.default)(app);
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
exports.default = app;
