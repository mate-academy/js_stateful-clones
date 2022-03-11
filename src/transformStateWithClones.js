'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const bArray = [];

  let stateClone = { ...state };

  for (const keys of actions) {
    const { type, extraData, keysToRemove } = keys;

    if (type === 'addProperties') {
      Object.assign(stateClone, extraData);
      bArray.push(Object.assign({}, stateClone));
    }

    if (type === 'removeProperties') {
      for (const keys1 of keysToRemove) {
        delete stateClone[keys1];
      }
      bArray.push(Object.assign({}, stateClone));
    }

    if (type === 'clear') {
      stateClone = {};
      bArray.push(Object.assign({}, stateClone));
    }
  }

  return bArray;
}

module.exports = transformStateWithClones;
