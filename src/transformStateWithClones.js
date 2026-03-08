'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState };
        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;
      default:
        break;
    }

    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
