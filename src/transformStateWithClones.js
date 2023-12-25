'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clonedState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          Object.assign(clonedState, action.extraData);
        }
        break;
      case 'removeProperties':
        if (action.keysToRemove) {
          for (const keyToRemove of action.keysToRemove) {
            delete clonedState[keyToRemove];
          }
        }
        break;
      case 'clear':
        for (const key of Object.keys(clonedState)) {
          delete clonedState[key];
        }
        break;
      default:
        break;
    }

    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;
