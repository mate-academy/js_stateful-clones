'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const previousVerOfStateArray = [];
  let copyState = { ...state };

  for (const a of actions) {
    // copyState = { ...state };

    if (a['type'] === 'addProperties') {
      Object.assign(copyState, a['extraData']);
      previousVerOfStateArray.push({ ...copyState });
    }

    if (a['type'] === 'removeProperties') {
      for (const r of a['keysToRemove']) {
        if (copyState.hasOwnProperty(r)) {
          delete copyState[r];
        }
      }
      previousVerOfStateArray.push({ ...copyState });
    }

    if (a['type'] === 'clear') {
      copyState = {};
      previousVerOfStateArray.push({ ...copyState });
    }
  }

  return previousVerOfStateArray;
}

module.exports = transformStateWithClones;
