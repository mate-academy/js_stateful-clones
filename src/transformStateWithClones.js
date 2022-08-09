'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newStateArr = [];

  for (const { type, extraData, keysToRemove } of actions) {
    if (type === 'addProperties') {
      for (const key in extraData) {
        newState[key] = extraData[key];
      }
      newStateArr.push({ ...newState });
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete newState[key];
      }
      newStateArr.push({ ...newState });
    }

    if (type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      newStateArr.push({ ...newState });
    }
  }

  return newStateArr;
}

module.exports = transformStateWithClones;
