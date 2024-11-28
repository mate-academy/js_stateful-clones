'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const finalArray = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;
      case 'clear':
        Object.keys(currentState).forEach((key) => delete currentState[key]);
        break;
    }
    finalArray.push({ ...currentState });
  }

  return finalArray;
}
module.exports = transformStateWithClones;
