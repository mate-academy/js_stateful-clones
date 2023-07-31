'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const ADD_PROPERTIES = 'addProperties';
const REMOVE_PROPERTIES = 'removeProperties';
const CLEAR_ALL = 'clear';

function transformStateWithClones(state, actions) {
  const finalState = { ...state };
  const stateHistory = [];

  for (const order of actions) {
    switch (order.type) {
      case ADD_PROPERTIES:
        Object.assign(finalState, order.extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const remove of order.keysToRemove) {
          delete finalState[remove];
        }
        break;

      case CLEAR_ALL:
        for (const key in finalState) {
          delete finalState[key];
        }
        break;
    }
    stateHistory.push(Object.assign({}, finalState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
