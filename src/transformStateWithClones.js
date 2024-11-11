'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;
        
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
        
      case 'clear':
        newState = {};
        break;
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
