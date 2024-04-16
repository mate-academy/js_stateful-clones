'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const cloneState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(cloneState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
    }

    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
