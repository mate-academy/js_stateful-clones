'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);

        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete currentState[keyToRemove];
        }

        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }

        break;

      default:
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
