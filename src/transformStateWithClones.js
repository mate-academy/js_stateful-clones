'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalArray = [];
  const newState = { ...state };

  for (const action of actions) {
    const cleanObject = {};

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const removedKey of action.keysToRemove) {
        delete newState[removedKey];
      }
    } else {
      for (const clearing in newState) {
        delete newState[clearing];
      }
    }

    finalArray.push(Object.assign(cleanObject, newState));
  }

  return finalArray;
}

module.exports = transformStateWithClones;
