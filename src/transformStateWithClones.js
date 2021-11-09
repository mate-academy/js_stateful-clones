'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const obj in action.extraData) {
        newState[obj] = action.extraData[obj];
      }
    } else if (action.type === 'removeProperties') {
      for (const obj of action.keysToRemove) {
        delete newState[obj];
      }
    } else if (action.type === 'clear') {
      for (const obj in newState) {
        delete newState[obj];
      }
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
