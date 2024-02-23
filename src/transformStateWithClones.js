'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultOfStates = [];
  const newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
      resultOfStates.push({ ...newState });
    }

    if (actions[i].type === 'removeProperties') {
      for (let y = 0; y < actions[i].keysToRemove.length; y++) {
        delete newState[actions[i].keysToRemove[y]];
      }
      resultOfStates.push({ ...newState });
    }

    if (actions[i].type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      resultOfStates.push({ ...newState });
    }
  }

  return resultOfStates;
}

module.exports = transformStateWithClones;
