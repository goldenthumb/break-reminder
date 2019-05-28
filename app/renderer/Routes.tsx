import * as React from 'react';
import { parse } from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

import Main from './windows/Main';

const Routes = ({ location: { search } }: RouteComponentProps) => {
  if (search) {
    const { window } = parse(search);

    if (window === 'main') return <Main />;
    // if (window === 'break') return <Break />;
    // if (window === 'overlay') return <Overlay />;
  }

  return null;
};

export default Routes;