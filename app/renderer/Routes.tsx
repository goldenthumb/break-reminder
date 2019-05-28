import * as React from 'react';
import { parse } from 'query-string';

import { Main, Break, Overlay } from './windows';

const Routes = ({ location: { search } }: RouteComponentPropsute) => {
  if (search) {
    const { window } = parse(search);

    if (window === 'main') return <Main />;
    if (window === 'break') return <Break />;
    if (window === 'overlay') return <Overlay />;
  }

  return null;
};

export default Routes;