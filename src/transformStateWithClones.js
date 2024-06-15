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
    let changedState = {};

    switch (type) {
      case 'addProperties':
        changedState = addProps(currentState, extraData);
        break;
      case 'removeProperties':
        changedState = removeProps(currentState, keysToRemove);
        break;
      case 'clear':
        changedState = {};
    }

    stateHistory.push(changedState);
    currentState = { ...changedState };
  }

  function addProps(obj, extraData) {
    const changedObj = { ...obj };

    Object.assign(changedObj, extraData);

    return changedObj;
  }

  function removeProps(obj, keysToRemove) {
    const changedObj = { ...obj };

    for (const key of keysToRemove) {
      delete changedObj[key];
    }

    return changedObj;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
