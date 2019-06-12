"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPC_EVENT;
(function (IPC_EVENT) {
    IPC_EVENT["PREFERENCES"] = "preferences";
    IPC_EVENT["BREAK_WINDOW"] = "breakWindow";
    IPC_EVENT["REMINDER_INTERVAL"] = "reminderInterval";
    IPC_EVENT["BREAK_DURATION"] = "breakDuration";
    IPC_EVENT["OPTION"] = "options";
    IPC_EVENT["NOTIFICATION"] = "notification";
})(IPC_EVENT = exports.IPC_EVENT || (exports.IPC_EVENT = {}));
var MILLISECOND;
(function (MILLISECOND) {
    MILLISECOND[MILLISECOND["HOUR"] = 3600000] = "HOUR";
    MILLISECOND[MILLISECOND["MIN"] = 60000] = "MIN";
    MILLISECOND[MILLISECOND["SEC"] = 1000] = "SEC";
})(MILLISECOND = exports.MILLISECOND || (exports.MILLISECOND = {}));
