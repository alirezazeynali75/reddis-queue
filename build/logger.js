"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerDriver = void 0;
const chalk_1 = __importDefault(require("chalk"));
class LoggerDriver {
    debug(msg) {
        chalk_1.default.blue(msg);
    }
    error(msg) {
        chalk_1.default.bold.redBright(msg);
    }
    info(msg) {
        chalk_1.default.bold.greenBright(msg);
    }
    warn(msg) {
        chalk_1.default.bold.yellowBright(msg);
    }
}
exports.LoggerDriver = LoggerDriver;
