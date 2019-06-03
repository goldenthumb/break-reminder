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
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const css = require('./OptionList.scss');
const OptionItem_1 = __importDefault(require("../OptionItem"));
const contexts_1 = require("../../contexts");
const OptionList = () => {
    const { state: { options } } = react_1.useContext(contexts_1.Context);
    const optionList = [
        {
            id: 0,
            name: 'Start at login',
            isChecked: options.startAtLogin,
            action: (checked) => {
                electron_1.ipcRenderer.send(constants_1.IPC_EVENT.OPTION, {
                    startAtLogin: checked
                });
            }
        },
        {
            id: 1,
            name: 'Notification',
            isChecked: options.notification,
            action: (checked) => {
                electron_1.ipcRenderer.send(constants_1.IPC_EVENT.OPTION, {
                    notification: checked
                });
            }
        },
        {
            id: 2,
            name: 'Sound',
            isChecked: options.sound,
            action: (checked) => {
                electron_1.ipcRenderer.send(constants_1.IPC_EVENT.OPTION, {
                    sound: checked
                });
            }
        }
    ];
    return (react_1.default.createElement("div", { className: css['option-list'] }, optionList.map(({ id, name, isChecked, action }) => (react_1.default.createElement(OptionItem_1.default, { key: id, name: name, isChecked: isChecked, action: action })))));
};
exports.default = OptionList;
