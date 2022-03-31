'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const steteItems = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      for (const key in i.extraData) {
        steteItems[key] = i.extraData[key];
      }
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete steteItems[key];
      }
    }

    if (i.type === 'clear') {
      for (const key in steteItems) {
        delete steteItems[key];
      }
    }

    result.push({ ...steteItems });
  }

  return result;
}

module.exports = transformStateWithClones;
