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

    switch (type) {
      case 'addProperties':
        Object.assign(stateObj, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateObj[key];
        }
        break;

      case 'clear':
        for (const key in stateObj) {
          delete stateObj[key];
        }
        break;
    }
    result.push({ ...stateObj });
  }

  return result;
}

module.exports = transformStateWithClones;
