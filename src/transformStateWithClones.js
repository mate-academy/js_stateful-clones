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
      for (const elem in action.extraData) {
        newState[elem] = action.extraData[elem];
      }
    }

    if (action.type === 'removeProperties') {
      for (const elem of action.keysToRemove) {
        delete newState[elem];
      }
    }

    if (action.type === 'clear') {
      for (const elem in newState) {
        delete newState[elem];
      }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
