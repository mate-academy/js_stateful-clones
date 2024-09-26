'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let localState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        localState = { ...localState, ...action.extraData };
        result.push({ ...localState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete localState[key];
        }
        result.push(localState);
        break;
      case 'clear':
        localState = {};
        result.push(localState);
        break;
      default:
        return;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
