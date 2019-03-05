import React, { Component, PureComponent, createContext } from 'react';

const Context = createContext();
const { Provider: ContextProvider, Consumer } = Context;

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalTime: 20 * 60 * 1000,
      breakTime: 10 * 1000,
      showBlockWindow: false,
      config: null
    };

    this.actions = {
      setConfig: (config) => {
        this.setState({
          config
        });
      },
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
      showBlockWindow: () => {
        this.setState({
          showBlockWindow: true
        });
      },
      closeBlockWindow: () => {
        this.setState({
          showBlockWindow: false
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

const useConsumer = (WrappedComponent) => {
  class WrapperComponent extends PureComponent {
    render() {
      return (
        <Consumer>
          {
            (contexts) => (
              <WrappedComponent
                {...this.props}
                ctx={contexts}
              />
            )
          }
        </Consumer>
      );
    }
  }

  WrapperComponent.displayName = `SubscribeWrap(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WrapperComponent;
};

export { Provider, useConsumer };