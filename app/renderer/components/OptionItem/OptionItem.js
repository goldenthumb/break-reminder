"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const Switch = require("react-switch");
const css = require('./OptionItem.scss');
const OptionItem = ({ name, isChecked, action }) => {
    const [option, setOption] = react_1.useState(isChecked);
    const handleToggle = () => {
        action(!option);
        setOption(!option);
    };
    return (React.createElement("div", { className: css['option-item'] },
        React.createElement("div", { className: css['option-name'] }, name),
        React.createElement("div", { className: css['switch-wrap'] },
            React.createElement(Switch, { checked: option, onChange: handleToggle, onColor: '#86d3ff', onHandleColor: '#2693e6', handleDiameter: 20, uncheckedIcon: false, checkedIcon: false, boxShadow: '0 1px 5px rgba(0, 0, 0, 0.6)', activeBoxShadow: '0 0 1px 10px rgba(0, 0, 0, 0.2)', height: 10, width: 30 }))));
};
exports.default = OptionItem;
