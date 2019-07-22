import React, { useRef, useEffect, useMemo } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';

export default function Audio() {
  const audio = useRef<HTMLAudioElement>(null);
  const { breakDuration } = useMemo(() => ipcRenderer.sendSync(IPC_EVENT.GET_PREFERENCES), []);
  const { duration } = useMemo(() => ipcRenderer.sendSync(IPC_EVENT.GET_Alarm_INFO), []);
  const audioDelay = breakDuration - (duration.toFixed(3) * 1000);

  useEffect(() => {
    const endTimer = setTimeout(() => {
      if (audio && audio.current) {
        audio.current.play();
      }
    }, audioDelay);

    return () => clearTimeout(endTimer);
  }, []);

  return (
    <audio ref={audio}>
      <source
        type='audio/mp3'
        src='../assets/audio/alarm.mp3'
      />
    </audio>
  );
};
