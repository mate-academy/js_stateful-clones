'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const testState = { ...state };
  const arrStates = [];

  for (const val in actions) {
    if (actions[val].type === 'clear') {
      for (const y in testState) {
        delete testState[y];
      }
    } else if (actions[val].type === 'addProperties') {
      Object.assign(testState, actions[val].extraData);
    } else if (actions[val].type === 'removeProperties') {
      for (const x of actions[val].keysToRemove) {
        delete testState[x];
      }
    }
    arrStates.push({ ...testState });
  }

  return arrStates;
}

module.exports = transformStateWithClones;
