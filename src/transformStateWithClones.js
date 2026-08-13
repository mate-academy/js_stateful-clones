'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const updatedStateObject = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(updatedStateObject, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove ?? []) {
        delete updatedStateObject[keyToRemove];
      }
    }

    if (action.type === 'clear') {
      for (const key in updatedStateObject) {
        delete updatedStateObject[key];
      }
    }
    resultArray.push({ ...updatedStateObject });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
