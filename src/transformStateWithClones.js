'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      newState = { ...newState, ...i.extraData };
    }

    if (i.type === 'removeProperties') {
      newState = { ...newState };

      for (const key of i.keysToRemove) {
        delete newState[key];
      }
    }

    if (i.type === 'clear') {
      newState = {};
    }

    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
