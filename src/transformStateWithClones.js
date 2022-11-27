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
    if (action.type === 'addProperties') {
      Object.assign(currState, action.extraData);
      stateArray.push({ ...currState });
    }

    if (action.type === 'removeProperties') {
      for (const removeProp of action.keysToRemove) {
        delete currState[removeProp];
      }

      stateArray.push({ ...currState });
    }

    if (action.type === 'clear') {
      for (const prop in currState) {
        delete currState[prop];
      }

      stateArray.push({ ...currState });
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
