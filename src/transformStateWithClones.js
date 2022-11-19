'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = {};

  for (const key in state) {
    copyState[key] = state[key];
  }

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const remove of action.keysToRemove) {
        delete copyState[remove];
      }
    }

    if (action.type === 'clear') {
      for (const el in copyState) {
        delete copyState[el];
      }
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
