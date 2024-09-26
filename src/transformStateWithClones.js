'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const myArray = [];
  let state2 = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(state2, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete state2[key];
        }
        break;

      case 'clear':
        state2 = {};
        break;
      default:
        return `Unknown action: ${action.type}`;
    }

    myArray.push({ ...state2 });
  }

  return myArray;
}

module.exports = transformStateWithClones;
