'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const StateCopy = { ...state };
  const res = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      for (const i in Object.assign(key.extraData)) {
        StateCopy[i] = key.extraData[i];
      }
      res.push({ ...StateCopy });
    }

    if (key.type === 'removeProperties') {
      for (const i of Object.assign(key.keysToRemove)) {
        delete StateCopy[i];
      }
      res.push({ ...StateCopy });
    }

    if (key.type === 'clear') {
      for (const i in Object.assign(StateCopy)) {
        delete StateCopy[i];
      }
      res.push({ ...StateCopy });
    }
  }

  return res;
}

module.exports = transformStateWithClones;
