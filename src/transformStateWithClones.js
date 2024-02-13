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
      const extra = action.extraData;

      for (const data in extra) {
        currentState[data] = extra[data];
      }
      result.push({ ...currentState });
    } else if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete currentState[keyToRemove];
      }
      result.push({ ...currentState });
    } else if (action.type === 'clear') {
      Object.keys(currentState).forEach(key => delete currentState[key]);
      result.push({ ...currentState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
