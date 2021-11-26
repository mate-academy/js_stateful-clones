'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const tempState = {};
  // copy state object to new temporary object

  for (const item in state) {
    tempState[item] = state[item];
  }

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

    stateArray.push(Object.assign({}, tempState));
  }

  return stateArray;
}

module.exports = transformStateWithClones;
