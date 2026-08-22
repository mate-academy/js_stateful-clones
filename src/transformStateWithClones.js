'use strict';

function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(copy, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const key2 of key.keysToRemove) {
        delete copy[key2];
      }
    }

    if (key.type === 'clear') {
      for (const key3 in copy) {
        delete copy[key3];
      }
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
