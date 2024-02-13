'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneState = { ...state };
  const statesArray = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(cloneState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const value of action.keysToRemove) {
        delete cloneState[value];
      }
    } else if (action.type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
    }

    statesArray.push({ ...cloneState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
