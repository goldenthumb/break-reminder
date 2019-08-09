import React from 'react';
const css = require('./OptionItem.scss');

import Switch from 'react-switch';

interface OptionItemProps {
    name: string;
    isChecked: boolean;
    action: (checked: boolean) => void;
}

export default function OptionItem({ name, isChecked, action }: OptionItemProps) {
    return (
        <div className={css.optionItem}>
            <div>{name}</div>
            <Switch
                checked={isChecked}
                onChange={() => action(!isChecked)}
                onColor='#86d3ff'
                onHandleColor='#2693e6'
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow='0 1px 5px rgba(0, 0, 0, 0.6)'
                activeBoxShadow='0 0 1px 10px rgba(0, 0, 0, 0.2)'
                height={6}
                width={26}
            />
        </div>
    );
}
