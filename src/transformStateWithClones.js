'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copy = { ...state };
  const stateArr = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(copy, action.extraData);
        break;
      case action.type === 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        break;
      case action.type === 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
      default:
        break;
    }

    stateArr.push({ ...copy });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
