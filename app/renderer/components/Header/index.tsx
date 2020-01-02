import React from 'react';

import { ipcRenderer } from 'electron';
import { IoIosPower } from 'react-icons/io';

import Button from '../Button';

const css = require('./Header.scss');

export default function Header() {
    return (
        <div className={css.header}>
            <div className={css.title}>
                Break Reminder
            </div>
            <div className={css.buttonWrap}>
                <Button theme="quit-icon" action={() => ipcRenderer.send('quit')}>
                    <IoIosPower />
                </Button>
            </div>
        </div>
    );
}
