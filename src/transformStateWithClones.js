'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const tempState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in tempState) {
          delete tempState[key];
        }
        break;
      case 'addProperties':
        Object.assign(tempState, action['extraData']);
        break;
      case 'removeProperties':
        for (const key of action['keysToRemove']) {
          delete tempState[key];
        }
        break;
      default: break;
    }

    stateArray.push({ ...tempState });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
