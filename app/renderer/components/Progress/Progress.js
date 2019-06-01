"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const rc_progress_1 = require("rc-progress");
const css = require('./Progress.scss');
const Progress = ({ percent }) => (React.createElement("div", { className: css['progress'] },
    React.createElement(rc_progress_1.Line, { percent: percent, strokeWidth: "3", trailWidth: "2", strokeColor: "#457ab1", trailColor: "#3a3a3a" })));
exports.default = Progress;
