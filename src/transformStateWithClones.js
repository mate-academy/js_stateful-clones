'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const res = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(res, action.extraData);
    }

    if (action.type === 'clear') {
      for (const key in res) {
        delete res[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete res[key];
      }
    }
    result.push(res);
    currentState = res;
  }

  return result;
}

module.exports = transformStateWithClones;
