'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  let copyOfState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyOfState[key];
        }
        break;

      case 'clear':
        copyOfState = {};
        break;

      default:
        throw Error;
    }
    arr.push({ ...copyOfState });
  }

  return arr;
}

module.exports = transformStateWithClones;
