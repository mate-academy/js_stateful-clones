'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      result.push(Object.assign(state, action.extraData));
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        result.push(delete state[key]);
      }
    } else if (action.type === 'clear') {
      for (const key in state) {
        result.push(delete state[key]);
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
