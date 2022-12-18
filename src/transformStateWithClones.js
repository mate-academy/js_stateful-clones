'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        cloneState[key] = action.extraData[key];
      }
      result.push({ ...cloneState });
    }

    if (action.type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
      result.push({ ...cloneState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }
      result.push({ ...cloneState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
