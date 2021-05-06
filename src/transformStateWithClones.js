'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let lastState = { ...state };

  for (const action of actions) {
    const state1 = { ...lastState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(state1, action.extraData);
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete state1[value];
        }
        break;

      case 'clear':
        for (const key in state1) {
          delete state1[key];
        }
    }

    result.push(state1);
    lastState = state1;
  }

  return result;
}

module.exports = transformStateWithClones;
