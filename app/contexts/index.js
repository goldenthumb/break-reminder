import React, { Component, createContext } from 'react';

const Context = createContext();
const { Provider: ContextProvider } = Context;

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalTime: 20 * 60 * 1000,
      breakTime: 10 * 1000,
      blockWindows: null
    };

    this.actions = {
      setIntervalTime: (intervalTime) => {
        this.setState({ breakInterval });
      },
      setBreakTime: (breakTime) => {
        this.setState({ breakTime });
      },
      setBlockWindows: (blockWindows) => {
        this.setState({ blockWindows });
      }
    };
  }

  render() {
    const { state, actions } = this;
    const { children } = this.props;
    const value = { state, actions };

    return (
      <ContextProvider value={value}>
        {children}
      </ContextProvider>
    );
  }
}

export { Provider, Context };