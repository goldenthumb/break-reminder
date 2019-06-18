import React from 'react';
const css = require('./Progress.scss');

import { Line } from 'rc-progress';

const Progress = ({ percent }: ProgressProps) => (
  <div className={css['progress']}>
    <Line
      percent={percent}
      strokeWidth="3"
      trailWidth="2"
      strokeColor="#457ab1"
      trailColor="#3a3a3a"
    />
  </div>
);

export default Progress;
export type ProgressProps = {
  percent: number;
}
