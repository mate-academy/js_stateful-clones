'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const finalState = { ...state };
  const stateHistory = [];

  for (const order of actions) {
    const ADD_PROPERTIES = order.type === 'addProperties';
    const REMOVE_PROPERTIES = order.type === 'removeProperties';
    const CLEAR_ALL = order.type === 'clear';

    if (ADD_PROPERTIES) {
      Object.assign(finalState, order.extraData);
      stateHistory.push(Object.assign({}, finalState));
    }

    if (REMOVE_PROPERTIES) {
      for (const remove of order.keysToRemove) {
        delete finalState[remove];
      }

      stateHistory.push(Object.assign({}, finalState));
    }

    if (CLEAR_ALL) {
      for (const key in finalState) {
        delete finalState[key];
      }

      stateHistory.push(Object.assign({}, finalState));
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
