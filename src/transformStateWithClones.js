'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let changeable = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateHistory.push(addProperties(changeable, action.extraData));
        changeable = { ...stateHistory[stateHistory.length - 1] };
        break;
      case 'removeProperties':
        stateHistory.push(removeProperties(changeable, action.keysToRemove));
        changeable = { ...stateHistory[stateHistory.length - 1] };
        break;
      case 'clear':
        stateHistory.push(clearObj());
        changeable = { ...stateHistory[stateHistory.length - 1] };
        break;
    }
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  return { ...state, ...extraData };
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clearObj() {
  return {};
}
module.exports = transformStateWithClones;
