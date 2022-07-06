'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const start = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(start, action.extraData);
      result.push(Object.assign({}, start));
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete start[key];
      }
      result.push(Object.assign({}, start));
    } else if (action.type === 'clear') {
      for (const key in start) {
        delete start[key];
      }
      result.push(Object.assign({}, start));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
