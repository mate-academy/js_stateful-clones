'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, [...actions]) {
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case action.type === 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;
      case action.type === 'clear':
        removeProperties(currentState, Object.keys(currentState));
    }

    const copyState = { ...currentState };

    stateHistory.push(copyState);
  }

  return stateHistory;
}

function removeProperties(yourObject, keysToRemove) {
  keysToRemove.forEach(key => {
    delete yourObject[key];
  });
}

module.exports = transformStateWithClones;
