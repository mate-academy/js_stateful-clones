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

        stateHistory.push({ ...tempObj });

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete tempObj[key];
        }

        stateHistory.push({ ...tempObj });

        break;

      case 'clear':
        for (const key in tempObj) {
          delete tempObj[key];
        }

        stateHistory.push({ ...tempObj });

        break;
    }
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
