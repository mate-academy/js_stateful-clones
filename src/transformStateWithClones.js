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

    switch (type) {
      case 'addProperties':
        Object.assign(tempObj, extraData);

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete tempObj[key];
        }

        break;

      case 'clear':
        for (const key in tempObj) {
          delete tempObj[key];
        }

        break;
    }

    stateHistory.push({ ...tempObj });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
