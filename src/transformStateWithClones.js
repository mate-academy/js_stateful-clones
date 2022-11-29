'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const currState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currState, action.extraData);
        break;

      case 'removeProperties':
        for (const removeProp of action.keysToRemove) {
          delete currState[removeProp];
        }
        break;

      case 'clear':
        for (const prop in currState) {
          delete currState[prop];
        }
        break;

      default:
        break;
    }

    stateArray.push({ ...currState });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
