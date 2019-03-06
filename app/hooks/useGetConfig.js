import { useEffect, useState } from 'react';
import { ipcRenderer }from 'electron';

const useGetConfig = () => {
  const [config, setConfig] = useState(null);

  const initInfoListener = (event, arg) => {
    setConfig(arg);
  };

  useEffect(() => {
    ipcRenderer.send('requestInitInfo');
    ipcRenderer.on('initInfo', initInfoListener);
    return () => ipcRenderer.removeListener('initInfo', initInfoListener);
  }, []);

  return [config];
};

export default useGetConfig;