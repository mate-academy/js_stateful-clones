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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => delete currentState[key]);
        break;

      default:
        Object.keys(currentState).forEach((key) => delete currentState[key]);
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
