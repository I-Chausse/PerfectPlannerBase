const callbacks = {};

export const setCallback = (key, callback) => {
  callbacks[key] = callback;
};

export const getCallback = (key) => {
  const callback = callbacks[key];
  delete callbacks[key];
  return callback;
};
