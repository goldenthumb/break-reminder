import React, { useRef, useEffect, useMemo } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';

export default function Audio() {
  const audio = useRef<HTMLAudioElement>(null);
  const { breakDuration } = useMemo(() => ipcRenderer.sendSync(IPC_EVENT.GET_PREFERENCES), []);

  useEffect(() => {
    const endTimer = setTimeout(() => {
      if (audio && audio.current) {
        audio.current.play();
      }
    }, breakDuration - 1500);

    return () => clearTimeout(endTimer);
  }, []);

  return (
    <audio ref={audio}>
      <source
        type='audio/mp3'
        src='../assets/audio/alarm.wav'
      />
    </audio>
  );
};
