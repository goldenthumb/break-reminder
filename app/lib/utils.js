"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msToTime = (duration) => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return [hours, minutes, seconds];
};
exports.msToTime = msToTime;
