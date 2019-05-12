const msToTime = (duration) => {
  const seconds = parseInt((duration / 1000) % 60);
  const minutes = parseInt((duration / (1000 * 60)) % 60);
  const hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  return [hours, minutes, seconds];
};

module.exports = { msToTime };