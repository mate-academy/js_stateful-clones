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
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        const stateCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        currentState = stateCopy;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Unknown action type');
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
