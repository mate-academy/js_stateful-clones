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
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(prototype, action.extraData);
        break;
      case action.type === 'removeProperties':
        for (const key of action.keysToRemove) {
          delete prototype[key];
        }
        break;
      case action.type === 'clear':
        for (const key in prototype) {
          delete prototype[key];
        }
        break;
    }

    statesHistory.push(Object.assign({}, prototype));
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
