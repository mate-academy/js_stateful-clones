'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = {
        ...currentState,
        ...action.extraData,
      };
      results.push({ ...currentState });
    } else if (action.type === 'removeProperties') {
      const newState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      currentState = { ...newState };
      results.push(newState);
    } else if (action.type === 'clear') {
      currentState = {};
      results.push({ ...currentState });
    }
  }

  return results;
}

module.exports = transformStateWithClones;
