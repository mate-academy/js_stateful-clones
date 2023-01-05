'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  const newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const prop in action.extraData) {
        newState[prop] = action.extraData[prop];
      }

      states.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      for (const prop of action.keysToRemove) {
        delete newState[prop];
      }

      states.push({ ...newState });
    }

    if (action.type === 'clear') {
      for (const prop in newState) {
        delete newState[prop];
      }

      states.push({ ...newState });
    }
  }

  return states;
}

module.exports = transformStateWithClones;
