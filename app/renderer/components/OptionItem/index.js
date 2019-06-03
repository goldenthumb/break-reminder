"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_switch_1 = __importDefault(require("react-switch"));
const css = require('./OptionItem.scss');
const OptionItem = ({ name, isChecked, action }) => {
    const [option, setOption] = react_1.useState(isChecked);
    const handleToggle = () => {
        action(!option);
        setOption(!option);
    };
    return (react_1.default.createElement("div", { className: css['option-item'] },
        react_1.default.createElement("div", { className: css['option-name'] }, name),
        react_1.default.createElement("div", { className: css['switch-wrap'] },
            react_1.default.createElement(react_switch_1.default, { checked: option, onChange: handleToggle, onColor: '#86d3ff', onHandleColor: '#2693e6', handleDiameter: 20, uncheckedIcon: false, checkedIcon: false, boxShadow: '0 1px 5px rgba(0, 0, 0, 0.6)', activeBoxShadow: '0 0 1px 10px rgba(0, 0, 0, 0.2)', height: 10, width: 30 }))));
};
exports.default = OptionItem;
