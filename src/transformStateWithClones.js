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
    let updatedState;
    switch(action.type) {
      case 'addProperties':
        updatedState = {
          ...currentState, ...action.extraData,
        };
        result.push(updatedState);
        break;
      case 'removeProperties':
        const keysToRemove = action.keysToRemove || [];
        updatedState = { ...currentState };

        for (const key of keysToRemove) {
          delete updatedState[key];
        }
        result.push(updatedState);
      break;
     case 'clear':
      result.push({});
      break;
    }
    currentState = { ...result[result.length - 1] };
  }

  return result;
}
module.exports = transformStateWithClones;
