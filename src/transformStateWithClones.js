'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const prototype = Object.assign({}, state);
  const statesHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(prototype, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete prototype[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in prototype) {
        delete prototype[key];
      }
    }

    statesHistory.push(Object.assign({}, prototype));
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
