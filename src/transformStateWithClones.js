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

    switch (type) {

    case 'addProperties':
      Object.assign(stateClone, extraData);
      break;

    case 'removeProperties':
      for (const keys1 of keysToRemove) {
        delete stateClone[keys1];
      }
      break

    case 'clear':
      stateClone = {};
      break
  }
  
  bArray.push(Object.assign({}, stateClone));
}

  return bArray;
}

module.exports = transformStateWithClones;
