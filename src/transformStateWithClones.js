'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempObj = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(tempObj, extraData);

      const resultAdd = { ...tempObj };

      stateHistory.push(resultAdd);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete tempObj[key];
      }

      const resultRemove = { ...tempObj };

      stateHistory.push(resultRemove);
    }

    if (type === 'clear') {
      for (const key in tempObj) {
        delete tempObj[key];
      }

      const resultClear = { ...tempObj };

      stateHistory.push(resultClear);
    }
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
