import React from 'react';
import qs from 'query-string';

import { Main, Break } from './windows';

const Routes = ({ location: { search } }) => {
  const parsedHash = qs.parse(search);

  const getWindow = () => ({
    main: <Main />,
    break: <Break />
  });

  return getWindow()[parsedHash.window] || null;
};

export default Routes;