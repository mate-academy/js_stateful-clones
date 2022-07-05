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
    switch (action.type) {
      case 'addProperties':
        Object.assign(prototype, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete prototype[key];
        }
        break;

      case 'clear':
        for (const key in prototype) {
          delete prototype[key];
        }
        break;

      default:
        break;
    }

    statesHistory.push(Object.assign({}, prototype));
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
