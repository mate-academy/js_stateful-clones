'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        stateCopy = clearProperties();
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;

  function addProperties(currentState, extraData) {
    return { ...currentState, ...extraData };
  }

  function removeProperties(currentState, keysToRemove) {
    const newState = {};

    for (const key in currentState) {
      if (!keysToRemove.includes(key)) {
        newState[key] = currentState[key];
      }
    }

    return newState;
  }

  function clearProperties() {
    return {};
  }
}

module.exports = transformStateWithClones;
