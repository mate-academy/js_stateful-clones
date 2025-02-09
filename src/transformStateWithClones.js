'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const finalArray = [];

  for (const action of actions) {
    clone = { ...clone };

    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
      finalArray.push(clone);
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete clone[keyToRemove];
      }
      finalArray.push(clone);
    }

    if (action.type === 'clear') {
      clone = {};
      finalArray.push(clone);
    }
  }

  return finalArray;
}

module.exports = transformStateWithClones;
