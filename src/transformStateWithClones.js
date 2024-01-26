'use strict';

/**
 * @param {Object} state
 * @param {-[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const keyToRemove of action.keysToRemove) {
            delete newState[keyToRemove];
          }
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    resultArray.push({ ...newState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
