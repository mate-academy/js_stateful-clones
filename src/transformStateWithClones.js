'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };

  const result = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(stateClone, key.extraData);

      // for (const keyPron in key.extraData) {
      //   stateClone[keyPron] = key.extraData[keyPron];
      // };
    }

    if (key.type === 'removeProperties') {
      for (const keyPron of key.keysToRemove) {
        delete stateClone[keyPron];
      }
    }

    if (key.type === 'clear') {
      stateClone = {};
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
