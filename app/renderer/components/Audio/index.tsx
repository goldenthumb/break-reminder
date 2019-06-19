import React, { useRef, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../../lib/enums';

const Audio = () => {
  const audio = useRef<HTMLAudioElement>(null);
  const { breakDuration, options } = ipcRenderer.sendSync(IPC_EVENT.PREFERENCES);

  useEffect(() => {
    const endTimer = setTimeout(() => {
      if (options.sound && audio && audio.current) {
        audio.current.play();
      }
    }, breakDuration - 2000);

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

export default Audio;
