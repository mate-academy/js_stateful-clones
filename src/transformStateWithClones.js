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
    if (action.type === 'clear') {
      Object.keys(newState).forEach(n => delete newState[n]);
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(n =>
        Object.prototype.hasOwnProperty.call(newState, n) && delete newState[n]
      );
    }
    result.push(Object.assign({}, newState));
  }

  return result;
}

module.exports = transformStateWithClones;
