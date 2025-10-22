'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let currentState = { ...state };
  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      arr.push({ ...currentState });
    }
    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
      arr.push({ ...currentState });
    }
    if (action.type === 'clear') {
      currentState = {};
      arr.push({ ...currentState });
    }
  }
  return arr;
}

module.exports = transformStateWithClones;
