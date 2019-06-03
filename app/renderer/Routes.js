"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const query_string_1 = require("query-string");
const Main_1 = __importDefault(require("./windows/Main"));
const Break_1 = __importDefault(require("./windows/Break"));
const Overlay_1 = __importDefault(require("./windows/Overlay"));
const Routes = ({ location: { search } }) => {
    if (!search)
        return null;
    const { window } = query_string_1.parse(search);
    if (window === 'main')
        return react_1.default.createElement(Main_1.default, null);
    if (window === 'break')
        return react_1.default.createElement(Break_1.default, null);
    if (window === 'overlay')
        return react_1.default.createElement(Overlay_1.default, null);
    return null;
};
exports.default = Routes;
