'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];
  let copyState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copyState = Object.assign({}, copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const propertyToRemove of action.keysToRemove) {
          delete copyState[propertyToRemove];
        }
        break;

      case 'clear':
        for (const property in copyState) {
          delete copyState[property];
        }
        break;

      default:
        break;
    }

    allStates.push(copyState);
    copyState = Object.assign({}, allStates[allStates.length - 1]);
  }

  return allStates;
}

module.exports = transformStateWithClones;
