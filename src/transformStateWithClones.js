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
    let nextState = {};

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;
     
      case 'addProperties':
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        nextState = { ...currentState };
        for (const keyToRemove of action.keysToRemove) {
          delete nextState[keyToRemove];
        }
        break;

      default:
        nextState = { ...currentState };
    }
  
    stateHistory.push(nextState);
    currentState = { ...nextState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
