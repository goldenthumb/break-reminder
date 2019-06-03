"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_router_dom_1 = require("react-router-dom");
require("./index.scss");
const contexts_1 = require("./contexts");
const Routes_1 = __importDefault(require("./Routes"));
const App = () => (react_1.default.createElement(contexts_1.Provider, null,
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", component: Routes_1.default }))));
react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById('root'));
