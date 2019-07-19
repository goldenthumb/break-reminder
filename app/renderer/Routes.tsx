import React from 'react';
import { parse } from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

import { Provider } from './contexts';

import Main from './windows/Main';
import Block from './windows/Block';
import Overlay from './windows/Overlay';

const Routes = ({ location: { search } }: RouteComponentProps) => {
  if (!search) return null;
  const { window } = parse(search);
  
  switch (window) {
    case 'main': return <Provider children={<Main />} />;
    case 'block': return <Block />;
    case 'overlay': return <Overlay />;
    default: return null;
  }
};

export default Routes;
