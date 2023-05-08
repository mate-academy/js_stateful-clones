'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const data in action.extraData) {
        newState[data] = action.extraData[data];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      Object.keys(newState).forEach(key => delete newState[key]);
    }
    result.push(Object.assign({}, newState));
  }

  return result;
}

module.exports = transformStateWithClones;
