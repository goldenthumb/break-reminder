"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const css = require('./Body.scss');
const Body = ({ children }) => (React.createElement("div", { className: css['body'] }, children));
exports.default = Body;
