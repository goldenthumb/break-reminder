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
const constants_1 = require("../../lib/constants");
const Context = react_1.createContext({});
exports.Context = Context;
const { Provider: ContextProvider } = Context;
class Provider extends react_1.Component {
    constructor(props) {
        super(props);
        this.reminderTimeListener = (event, ms) => {
            this.actions.setReminderInterval(ms);
        };
        this.breakTimeListener = (event, ms) => {
            this.actions.setBreakDuration(ms);
        };
        this.optionListener = (event, options) => {
            this.actions.setOptions(options);
        };
        this.breakWindowListener = (event, { status }) => {
            if (status === 'open') {
                this.actions.showBreakWindow();
            }
            if (status === 'close') {
                this.actions.closeBreakWindow();
            }
        };
        this.notificationListener = (event, { title, options }) => {
            new Notification(title, options);
        };
        const preferences = electron_1.ipcRenderer.sendSync(constants_1.IPC_EVENT.PREFERENCES);
        const { reminderInterval, breakDuration, options } = preferences;
        this.state = {
            reminderInterval,
            breakDuration,
            options,
            showBreakWindow: false
        };
        this.actions = {
            setOptions: (options) => {
                this.setState({ options });
            },
            setReminderInterval: (ms) => {
                this.setState({
                    reminderInterval: ms
                });
            },
            setBreakDuration: (ms) => {
                this.setState({
                    breakDuration: ms
                });
            },
            showBreakWindow: () => {
                this.setState({
                    showBreakWindow: true
                });
            },
            closeBreakWindow: () => {
                this.setState({
                    showBreakWindow: false
                });
            }
        };
    }
    componentDidMount() {
        electron_1.ipcRenderer.on(constants_1.IPC_EVENT.REMINDER_INTERVAL, this.reminderTimeListener);
        electron_1.ipcRenderer.on(constants_1.IPC_EVENT.BREAK_DURATION, this.breakTimeListener);
        electron_1.ipcRenderer.on(constants_1.IPC_EVENT.OPTION, this.optionListener);
        electron_1.ipcRenderer.on(constants_1.IPC_EVENT.BREAK_WINDOW, this.breakWindowListener);
        electron_1.ipcRenderer.on(constants_1.IPC_EVENT.NOTIFICATION, this.notificationListener);
    }
    componentWillUnmount() {
        electron_1.ipcRenderer.removeListener(constants_1.IPC_EVENT.REMINDER_INTERVAL, this.reminderTimeListener);
        electron_1.ipcRenderer.removeListener(constants_1.IPC_EVENT.BREAK_DURATION, this.breakTimeListener);
        electron_1.ipcRenderer.removeListener(constants_1.IPC_EVENT.OPTION, this.optionListener);
        electron_1.ipcRenderer.removeListener(constants_1.IPC_EVENT.BREAK_WINDOW, this.breakWindowListener);
        electron_1.ipcRenderer.removeListener(constants_1.IPC_EVENT.NOTIFICATION, this.notificationListener);
    }
    render() {
        const { state, actions } = this;
        const { children } = this.props;
        const value = { state, actions };
        return (react_1.default.createElement(ContextProvider, { value: value }, children));
    }
}
exports.Provider = Provider;
