'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const previousVerOfStateArray = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (copyState.hasOwnProperty(keyToRemove)) {
            delete copyState[keyToRemove];
          }
        }
        break;
      case 'clear':
        copyState = {};
        break;
    }

    previousVerOfStateArray.push({ ...copyState });
  }

  return previousVerOfStateArray;
}

module.exports = transformStateWithClones;
