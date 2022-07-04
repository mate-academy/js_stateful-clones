'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copyState = {};
  const result = [];

  Object.assign(copyState, state);

  for (const action of actions) {
    copyState = Object.assign({}, copyState);

    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
      result.push(copyState);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
      result.push(copyState);
    }

    if (action.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      result.push(copyState);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
