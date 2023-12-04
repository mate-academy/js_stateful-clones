'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          stateClone = {
            ...stateClone, ...action.extraData,
          };
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const keyToRemove of action.keysToRemove) {
            delete stateClone[keyToRemove];
          }
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        break;
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
