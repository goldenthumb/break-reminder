import React from 'react';

import Header from '../components/Header';
import Body from '../components/Body';
import TimeBoard from '../components/TimeBoard';
import BreakTimePicker from '../components/BreakTimePicker';
import OptionList from '../components/OptionList';

export default function Main() {
  return <>
    <Header />
    <Body>
      <TimeBoard />
      <BreakTimePicker />
      <OptionList />
    </Body>
  </>;
}
