'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const x of action.keysToRemove) {
          delete newState[x];
        };
        break;

      case 'clear':
        for (const j in newState) {
          delete newState[j];
        }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
