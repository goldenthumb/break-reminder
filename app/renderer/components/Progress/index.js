"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const rc_progress_1 = require("rc-progress");
const css = require('./Progress.scss');
const Progress = ({ percent }) => (react_1.default.createElement("div", { className: css['progress'] },
    react_1.default.createElement(rc_progress_1.Line, { percent: percent, strokeWidth: "3", trailWidth: "2", strokeColor: "#457ab1", trailColor: "#3a3a3a" })));
exports.default = Progress;
