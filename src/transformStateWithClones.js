'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const { type, keysToRemove, extraData } of actions) {
    switch (type) {
      case 'addProperties':
        addProps(currentState, extraData);
        break;
      case 'removeProperties':
        removeProps(currentState, keysToRemove);
        break;
      case 'clear':
        currentState = {};
    }

    stateHistory.push({ ...currentState });
  }

  function addProps(obj, extraData) {
    Object.assign(obj, extraData);
  }

  function removeProps(obj, keysToRemove) {
    for (const key of keysToRemove) {
      delete obj[key];
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
