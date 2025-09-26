'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let newState = {};
  let currentState = { ...state };

  for (const step of actions) {
    newState = { ...currentState };

    switch (step.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, step.extraData);
        break;

      case 'removeProperties':
        const keys = Array.isArray(step.keysToRemove) ? step.keysToRemove : [];

        for (const key of keys) {
          delete newState[key];
        }
        break;

      default:
        break;
    }

    results.push({ ...newState });
    currentState = newState;
  }

  return results;
}
module.exports = transformStateWithClones;
