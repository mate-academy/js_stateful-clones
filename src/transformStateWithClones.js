'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      newState = {};
    }

    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      newState = { ...newState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
