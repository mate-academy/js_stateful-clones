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
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...extraData,
        };
        break;
      case 'removeProperties':
        for (let j = 0; j < keysToRemove.length; j++) {
          const key = keysToRemove[j];

          if (key in currentState) {
            delete currentState[key];
          }
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
