import React from 'react';
import { parse } from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

import Main from './windows/Main';
import Block from './windows/Block';
import Overlay from './windows/Overlay';

export default function Routes({ location: { search } }: RouteComponentProps) {
    if (!search) return null;
    const { window } = parse(search);

    switch (window) {
        case 'main': return <Main />;
        case 'block': return <Block />;
        case 'overlay': return <Overlay />;
        default: return null;
    }
}
