'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultState = { ...state };
  const result = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(resultState, key.extraData);
    } else if (key.type === 'removeProperties') {
      for (const step of key.keysToRemove) {
        delete resultState[step];
      }
    } else if (key.type === 'clear') {
      for (const keys in resultState) {
        delete resultState[keys];
      }
    }
    result.push({ ...resultState });
  }

  return result;
}

module.exports = transformStateWithClones;
