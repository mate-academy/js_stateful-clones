'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformStateClone = [];

  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;
        const { ...newState } = currentState;

        keysToRemove.forEach(key => delete newState[key]);
        currentState = newState;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        currentState = { ...state };
    }
    transformStateClone.push({ ...currentState });
  }

  return transformStateClone;
}

module.exports = transformStateWithClones;
