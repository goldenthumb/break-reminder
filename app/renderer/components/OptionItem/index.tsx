import React, { useState } from 'react';
const css = require('./OptionItem.scss');

import Switch from 'react-switch';

interface OptionItemProps {
  name: string;
  isChecked: boolean;
  action: (checked: boolean) => void;
}

export default function OptionItem({ name, isChecked, action }: OptionItemProps) {
  const [option, setOption] = useState(isChecked);

  const handleToggle = () => {
    action(!option);
    setOption(!option);
  };

  return (
    <div className={css['option-item']}>
      <div className={css['option-name']}>
        {name}
      </div>
      <div className={css['switch-wrap']}>
        <Switch
          checked={option}
          onChange={handleToggle}
          onColor='#86d3ff'
          onHandleColor='#2693e6'
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow='0 1px 5px rgba(0, 0, 0, 0.6)'
          activeBoxShadow='0 0 1px 10px rgba(0, 0, 0, 0.2)'
          height={10}
          width={30}
        />
      </div>
    </div>
  );
};
