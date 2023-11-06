/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistory = [];
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_PROPERTIES:
        Object.assign(stateCopy, extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        console.error('Unknown Action');
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
