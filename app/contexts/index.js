import React, { Component, createContext } from 'react';

const Context = createContext();
const { Provider: ContextProvider } = Context;

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakInterval: 20 * 60 * 1000,
      breakDuration: 20 * 1000,
      showBreakWindow: false
    };

    this.actions = {
      setBreakInterval: (breakInterval) => {
        this.setState({ breakInterval });
      },
      setBreakDuration: (breakDuration) => {
        this.setState({ breakDuration });
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