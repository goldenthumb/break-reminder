"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
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
    return (react_1.default.createElement("audio", { ref: audio },
        react_1.default.createElement("source", { type: "audio/mp3", src: "./audio/alarm.wav" })));
};
exports.default = Audio;
