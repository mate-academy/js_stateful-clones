'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const steps = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    steps.push(Object.assign({}, newState));
  }

  return steps;
}

module.exports = transformStateWithClones;
