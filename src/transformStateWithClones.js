'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const result = [];

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(newState, i.extraData);
    };

    if (i.type === 'removeProperties') {
      for (const x of i.keysToRemove) {
        delete newState[x];
      };
    };

    if (i.type === 'clear') {
      for (const j in newState) {
        delete newState[j];
      }
    };

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
