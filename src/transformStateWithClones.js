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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        stateHistory.push({ ...stateCopy });
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        stateHistory.push({ ...stateCopy });
        break;

      case 'clear':
        clear(stateCopy);
        stateHistory.push({ ...stateCopy });
        break;
    }
  }

  function addProperties(value, extraData) {
    Object.assign(value, extraData);
  }

  function removeProperties(value, keysToRemove) {
    for (const key of keysToRemove) {
      delete value[key];
    }
  }

  function clear(value) {
    for (const key in value) {
      delete value[key];
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
