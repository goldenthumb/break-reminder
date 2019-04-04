import React, { useRef, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { IPC_EVENT } from '../../lib/constants';

const Audio = () => {
  const audio = useRef(null);
  const { breakDuration, options } = ipcRenderer.sendSync(IPC_EVENT.INITIAL_STATE);

  useEffect(() => {
    const endTimer = setTimeout(() => {
      if (options.sound) {
        audio.current.play();
      }
    }, breakDuration - 2000);

    return () => clearTimeout(endTimer);
  }, []);

  return (
    <audio ref={audio}>
      <source
        type="audio/mp3"
        src='./audio/alarm.wav'
      />
    </audio>
  );
};

export default Audio;