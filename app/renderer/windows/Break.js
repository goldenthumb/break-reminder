"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Overlay_1 = __importDefault(require("../components/Overlay"));
const BreakMessage_1 = __importDefault(require("../components/BreakMessage"));
const Break = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(Overlay_1.default, null),
    react_1.default.createElement(BreakMessage_1.default, null)));
exports.default = Break;
