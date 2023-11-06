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
    if (action.type === 'addProperties') {
      const newState = {
        ...currentState, ...action.extraData,
      };

      result.push({ ...newState });
      currentState = { ...newState };
    } else if (action.type === 'removeProperties') {
      const newState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      result.push({ ...newState });
      currentState = { ...newState };
    } else if (action.type === 'clear') {
      const newState = {};

      result.push({ ...newState });
      currentState = { ...newState };
    }
  }

  return result;
}

module.exports = transformStateWithClones;
