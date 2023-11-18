'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        keysToRemove.forEach(keyToRemove => {
          if (currentState.hasOwnProperty(keyToRemove)) {
            delete currentState[keyToRemove];
          }
        });
        break;

      case 'clear':
        currentState = {};
        break;

      default:
    }

    result.push({ ...currentState });
  }

  return result;
}
module.exports = transformStateWithClones;
