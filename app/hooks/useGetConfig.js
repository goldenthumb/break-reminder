import { useEffect, useState } from 'react';
import { ipcRenderer }from 'electron';

const useGetConfig = () => {
  const [config, setConfig] = useState(null);

  const ipcRendererListener = (event, arg) => {
    setConfig(arg);
  };

  useEffect(() => {
    ipcRenderer.send('requestConfig');
    ipcRenderer.on('config', ipcRendererListener);
    return () => ipcRenderer.removeListener('config', ipcRendererListener);
  }, []);

  return [config];
};

export default useGetConfig;