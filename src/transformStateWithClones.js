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
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(i => delete newState[i]);
    } else {
      Object.keys(newState).forEach(key => delete newState[key]);
    }

    const newObj = { ...newState };

    stateArr.push(newObj);
  }

  return stateArr;
}

module.exports = transformStateWithClones;
