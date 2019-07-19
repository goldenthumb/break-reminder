import React from 'react';
const css = require('./Progress.scss');

import { Line } from 'rc-progress';

interface ProgressProps {
  percent: number;
}

export default function Progress({ percent }: ProgressProps) {
  return (
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
};
