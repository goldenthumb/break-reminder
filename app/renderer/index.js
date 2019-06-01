"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
require("./index.scss");
const contexts_1 = require("./contexts");
const Routes_1 = require("./Routes");
const App = () => (React.createElement(contexts_1.Provider, null,
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(react_router_dom_1.Route, { path: "/", component: Routes_1.default }))));
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
