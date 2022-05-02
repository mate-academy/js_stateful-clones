'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateObj = { ...state };
  const result = [];

  for (const action of actions) {
    const {
      type,
      extraData,
      keysToRemove,
    } = action;

    if (type === 'addProperties') {
      Object.assign(stateObj, extraData);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete stateObj[key];
      }
    }

    if (type === 'clear') {
      for (const key in stateObj) {
        delete stateObj[key];
      }
    }
    result.push({ ...stateObj });
  }
  return result;
}

module.exports = transformStateWithClones;
