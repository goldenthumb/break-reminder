const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const msToTime = (duration) => {
  let seconds = parseInt((duration / 1000) % 60);
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  return [hours, minutes, seconds];
};

module.exports = { msToTime, hasOwn };