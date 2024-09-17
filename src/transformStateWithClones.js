'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let changedState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        for (const data in extraData) {
          changedState[data] = extraData[data];
        }
        break;

      case 'removeProperties':
        for (const del of keysToRemove) {
          delete changedState[del];
        }
        break;

      case 'clear':
        changedState = {};
        break;
    }
    arr.push({ ...changedState });
  }

  return arr;
}

module.exports = transformStateWithClones;
