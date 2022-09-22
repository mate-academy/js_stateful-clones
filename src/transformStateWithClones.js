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
    switch (key.type) {
      case 'addProperties':
        Object.assign(stateClone, key.extraData);
        break;

      case 'removeProperties':
        for (const keyPron of key.keysToRemove) {
          delete stateClone[keyPron];
        }
        break;

      case 'clear':
        stateClone = {};
        break;
    }

    result.push({ ...stateClone });
  }

  return result;
}
module.exports = transformStateWithClones;
