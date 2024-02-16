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

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = {
          ...newState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          if (key in newState) {
            delete newState[key];
          }
        });
        break;
    }
    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
