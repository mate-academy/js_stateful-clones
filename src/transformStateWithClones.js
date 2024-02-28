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
  const actionTypes = {
    addProperties: 'addProperties',
    removeProperties: 'removeProperties',
    clear: 'clear',
  };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case actionTypes.addProperties:
        if (extraData) {
          Object.assign(clonedState, extraData);
        }
        break;

      case actionTypes.removeProperties:
        if (keysToRemove) {
          for (const keyToRemove of keysToRemove) {
            delete clonedState[keyToRemove];
          }
        }
        break;

      case actionTypes.clear:
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
