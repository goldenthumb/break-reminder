"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const css = require('./OptionList.scss');
const OptionItem_1 = require("../OptionItem");
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
    return (React.createElement("div", { className: css['option-list'] }, optionList.map(({ id, name, isChecked, action }) => (React.createElement(OptionItem_1.default, { key: id, name: name, isChecked: isChecked, action: action })))));
};
exports.default = OptionList;
