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
        stateArray.push({ ...currState });
        break;

      case 'removeProperties':
        for (const removeProp of action.keysToRemove) {
          delete currState[removeProp];
        }

        stateArray.push({ ...currState });
        break;

      case 'clear':
        for (const prop in currState) {
          delete currState[prop];
        }

        stateArray.push({ ...currState });
        break;

      default:
        break;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
