"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const query_string_1 = require("query-string");
const Main_1 = require("./windows/Main");
const Break_1 = require("./windows/Break");
const Overlay_1 = require("./windows/Overlay");
const Routes = ({ location: { search } }) => {
    if (!search)
        return null;
    const { window } = query_string_1.parse(search);
    if (window === 'main')
        return React.createElement(Main_1.default, null);
    if (window === 'break')
        return React.createElement(Break_1.default, null);
    if (window === 'overlay')
        return React.createElement(Overlay_1.default, null);
    return null;
};
exports.default = Routes;
