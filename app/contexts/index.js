import React, { Component, createContext } from 'react';

const Context = createContext();
const { Provider: ContextProvider } = Context;

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalTime: 6 * 1000,
      breakTime: 3 * 1000,
      blockWindows: null
    };

    this.actions = {
      setIntervalTime: (time) => {
        this.setState({
          breakInterval: time
        });
      },
      setBreakTime: (time) => {
        this.setState({
          breakTime: time
        });
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