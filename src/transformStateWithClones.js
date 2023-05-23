'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const newArray = [];

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    if (type === 'addProperties') {
      Object.assign(stateClone, extraData);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete stateClone[key];
      }
    }

    if (type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }
    newArray.push({ ...stateClone });
  }

  return newArray;
}

module.exports = transformStateWithClones;
