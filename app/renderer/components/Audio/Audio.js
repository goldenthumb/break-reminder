"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const electron_1 = require("electron");
const constants_1 = require("../../../lib/constants");
const Audio = () => {
    const audio = react_1.useRef(null);
    const { breakDuration, options } = electron_1.ipcRenderer.sendSync(constants_1.IPC_EVENT.PREFERENCES);
    react_1.useEffect(() => {
        const endTimer = setTimeout(() => {
            if (options.sound && audio && audio.current) {
                audio.current.play();
            }
        }, breakDuration - 2000);
        return () => clearTimeout(endTimer);
    }, []);
    return (React.createElement("audio", { ref: audio },
        React.createElement("source", { type: "audio/mp3", src: "./audio/alarm.wav" })));
};
exports.default = Audio;
