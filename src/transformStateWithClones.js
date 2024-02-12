'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  const stateCopy = { ...state };
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR_LIST = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        addProperties(stateCopy, action.extraData);
        stateHistory.push({ ...stateCopy });
        break;

      case REMOVE_PROPERTIES:
        removeProperties(stateCopy, action.keysToRemove);
        stateHistory.push({ ...stateCopy });
        break;

      case CLEAR_LIST:
        clearProperties(stateCopy);
        stateHistory.push({ ...stateCopy });
        break;
    }
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
