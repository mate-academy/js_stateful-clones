'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const res = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        for (const key of Object.keys(action.extraData)) {
          stateClone[key] = action.extraData[key];
        }
        break;
      }

      case 'removeProperties': {
        for (const keyToRemove of action.keysToRemove) {
          if (stateClone[keyToRemove]) {
            delete stateClone[keyToRemove];
          }
        }
        break;
      }

      case 'clear': {
        for (const keyToRm of Object.keys(stateClone)) {
          delete stateClone[keyToRm];
        }
      }
    }
    res.push({ ...stateClone });
  }

  return res;
}

module.exports = transformStateWithClones;
