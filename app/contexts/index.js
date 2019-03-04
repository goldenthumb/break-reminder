import React, { Component, PureComponent, createContext } from 'react';

const Context = createContext();
const { Provider: ContextProvider, Consumer } = Context;

class Provider extends Component {
  state = {};

  actions = {};

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