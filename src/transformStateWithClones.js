'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'clear' :
        currentState = {};
        break;
      case 'addProperties' :
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const toRemove of action.keysToRemove) {
          delete currentState[toRemove];
        }
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
