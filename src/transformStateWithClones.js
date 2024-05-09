'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateNew = { ...state };
  const result = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(stateNew, key.extraData);
        break;

      case 'removeProperties':
        for (const action of key.keysToRemove) {
          delete stateNew[action];
        }
        break;

      case 'clear':
        stateNew = {};
        break;
    }
    result.push({ ...stateNew });
  }

  return result;
}

module.exports = transformStateWithClones;
