'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const localState = { ...state };
  let arrayOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(localState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete localState[key];
        }
        break;
      case 'clear':
        for (const key in localState) {
          delete localState[key];
        }
        break;
      default:
        throw new Error('Unknown action type');
    }
    arrayOfStates = [ ...arrayOfStates, { ...localState } ];
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
