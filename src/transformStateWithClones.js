'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here Object.assign({}, state)
  const stateHistory = [Object.assign({}, state)];

  for (const action of actions) {
    const nextState = Object.assign({}, stateHistory[stateHistory.length - 1]);

    switch (action.type) {
      case 'clear':
        Object.keys(nextState).forEach((key) => delete nextState[key]);
        break;
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete nextState[keyToRemove];
        }
        break;
      default:
        break;
    }

    stateHistory.push(nextState);
  }

  stateHistory.shift();

  return stateHistory;
}

module.exports = transformStateWithClones;
