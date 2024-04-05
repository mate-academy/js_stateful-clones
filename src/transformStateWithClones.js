'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [Object.assign({}, state)];

  for (const action of actions) {
    const newState = Object.assign({}, stateHistory[stateHistory.length - 1]);

    switch (action.type) {
      case 'clear':
        Object.keys(newState).forEach((key) => delete newState[key]);
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete newState[key]);
        break;

      default:
        break;
    }

    stateHistory.push(newState);
  }

  return stateHistory.slice(1);
}

module.exports = transformStateWithClones;
