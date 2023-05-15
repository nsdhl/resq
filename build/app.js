"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.json("App is running");
});
var server = http_1.default.createServer(app);
server.listen('8000', function () {
    console.log("App is running in port 8000");
});
