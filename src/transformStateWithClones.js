'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedStates = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        if (extraData) {
          Object.assign(currentState, extraData);
        }
        break;
      case 'removeProperties':
        keysToRemove.forEach(key => delete currentState[key]);
        break;
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
      default:
        throw new Error(`Unsupported action type: ${type}`);
    }

    transformedStates.push({ ...currentState });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
