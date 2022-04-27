'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newActions = [];
  const newState = { ...state };

  for (const value of actions) {
    if (value.type === 'addProperties') {
      Object.assign(newState, value.extraData);
    }

    if (value.type === 'removeProperties') {
      for (const value2 of value.keysToRemove) {
        if (newState.hasOwnProperty(value2)) {
          delete newState[value2];
        }
      }
    }

    if (value.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    newActions.push({ ...newState });
  }

  return newActions;
}

module.exports = transformStateWithClones;
