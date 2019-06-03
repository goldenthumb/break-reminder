import React from 'react';
import { Line } from 'rc-progress';
const css = require('./Progress.scss');

export interface ProgressProps {
  percent: number;
}

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
