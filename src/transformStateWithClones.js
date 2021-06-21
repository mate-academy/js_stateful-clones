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
  const currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);

      result.push({ ...currentState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }

      result.push({ ...currentState });
    }

    if (action.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }

      result.push({ ...currentState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
