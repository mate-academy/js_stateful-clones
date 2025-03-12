'use strict';

/**
 * Transforms the state by applying a series of actions and
 * returns the state history.
 *
 * @param {Object} state - The initial state.
 * @param {Object[]} actions - The list of actions to apply.
 * @return {Object[]} - The history of state changes.
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const OPERATION_ADD = 'addProperties';
  const OPERATION_REMOVE = 'removeProperties';
  const OPERATION_CLEAR = 'clear';
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case OPERATION_ADD:
        addProperties(stateCopy, action.extraData);
        break;

      case OPERATION_REMOVE:
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case OPERATION_CLEAR:
        stateCopy = {};
        break;

      default:
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

/**
 * Adds properties to the given state object.
 *
 * @param {Object} state - The state object to modify.
 * @param {Object} extraData - The properties to add.
 */
function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

/**
 * Removes properties from the given state object.
 *
 * @param {Object} state - The state object to modify.
 * @param {Array} keysToRemove - The keys to remove from the state.
 */
function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
