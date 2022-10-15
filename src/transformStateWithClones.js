'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArr = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(i => delete newState[i]);
        break;
      case 'clear':
        Object.keys(newState).forEach(key => delete newState[key]);
        break;
      default:
        break;
    }

    const newObj = { ...newState };

    stateArr.push(newObj);
  }

  return stateArr;
}

module.exports = transformStateWithClones;
