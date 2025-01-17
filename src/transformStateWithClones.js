'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const arr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        cloneState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }
    }

    if (action.type === 'clear') {
      cloneState = {};
    }

    arr.push({ ...cloneState });
  }

  return arr;
}

module.exports = transformStateWithClones;
