'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let newArray = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newArray, action.extraData);
        break;

      case 'clear':
        newArray = {};
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newArray[keyToRemove];
        }
    }

    result.push({ ...newArray });
  }

  return result;
}

module.exports = transformStateWithClones;
