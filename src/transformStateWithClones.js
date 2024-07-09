'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const stateHistory = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      Object.keys(action.extraData).forEach((key) => {
        obj['' + key] = action.extraData[key];
      });
      stateHistory.push({ ...obj });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        delete obj[key];
      });
      stateHistory.push({ ...obj });
    }

    if (action.type === 'clear') {
      Object.keys(obj).forEach((key) => {
        delete obj[key];
      });
      stateHistory.push({ ...obj });
    }
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
