'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = Object.keys(currentState).reduce((newState, key) => {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }

          return newState;
        }, {});
        break;

      case 'clear':
        currentState = {};
        break;
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
