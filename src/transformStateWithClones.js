'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultState = [];
  const obj = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(obj, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const i of action.keysToRemove) {
        delete obj[i];
      }
    }

    if (action.type === 'clear') {
      for (const i in obj) {
        delete obj[i];
      }
    }
    resultState.push({ ...obj });
  }

  return resultState;
}

module.exports = transformStateWithClones;
