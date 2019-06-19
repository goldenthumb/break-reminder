import React from 'react';
import { parse } from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

import Main from './windows/Main';
import Block from './windows/Block';
import Overlay from './windows/Overlay';

const Routes = ({ location: { search } }: RouteComponentProps) => {
  if (!search) return null;

  const { window } = parse(search);

  if (window === 'main') return <Main />;
  if (window === 'block') return <Block />;
  if (window === 'overlay') return <Overlay />;

  return null;
};

export default Routes;
