const msToTime = (duration: number) => {
  const seconds = Math.round((duration / 1000) % 60);
  const minutes = Math.round((duration / (1000 * 60)) % 60);
  const hours = Math.round((duration / (1000 * 60 * 60)) % 24);

  return [hours, minutes, seconds];
};

export { msToTime };