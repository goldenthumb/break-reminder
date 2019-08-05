import React from 'react';

import Header from '../components/Header';
import Body from '../components/Body';
import Timer from '../components/Timer';
import WorkTimePicker from '../components/WorkTimePicker';
import BreakTimePicker from '../components/BreakTimePicker';
import OptionList from '../components/OptionList';

export default function Main() {
  return <>
    <Header />
    <Body>
      <Timer />
      <WorkTimePicker />
      <BreakTimePicker />
      <OptionList />
    </Body>
  </>;
}
