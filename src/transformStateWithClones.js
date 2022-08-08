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

  for (const i of actions) {
    if (i.type === 'addProperties') {
      for (const key in i.extraData) {
        newState[key] = i.extraData[key];
      }
      newStateArr.push({ ...newState });
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete newState[key];
      }
      newStateArr.push({ ...newState });
    }

    if (i.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      newStateArr.push({ ...newState });
    }
  }

  return newStateArr;
}

module.exports = transformStateWithClones;
