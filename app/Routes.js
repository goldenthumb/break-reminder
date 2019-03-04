import React from 'react';
import qs from 'query-string';

import { Main, Block } from './pages';

const Routes = ({ location: { search } }) => {
  const parsedHash = qs.parse(search);

  const getPage = () => ({
    main: <Main />,
    block: <Block />
  });

  return getPage()[parsedHash.page] || null;
};

export default Routes;