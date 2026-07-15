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
    const action = actions[i];

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        const stateCopy = { ...currentState };

        for (let j = 0; j < action.keysToRemove.length; j++) {
          delete stateCopy[action.keysToRemove[j]];
        }

        currentState = stateCopy;
        break;

      default:
        break;
    }

    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
