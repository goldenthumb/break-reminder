"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const css = require('./Overlay.scss');
const Overlay = () => react_1.default.createElement("div", { className: css['overlay'] });
exports.default = Overlay;
