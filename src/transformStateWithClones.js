'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clearState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clearState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const value of action.keysToRemove) {
        delete clearState[value];
      }
    }

    if (action.type === 'clear') {
      for (const key in clearState) {
        delete clearState[key];
      }
    }

    result.push(Object.assign({}, clearState));
  }

  return result;
}

module.exports = transformStateWithClones;
