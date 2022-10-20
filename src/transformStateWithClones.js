'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const copyState = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copyState, obj.extraData);
        break;

      case 'removeProperties':
        for (const value of obj.keysToRemove) {
          delete copyState[value];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        break;
    }
    arr.push({ ...copyState });
  }

  return arr;
}

module.exports = transformStateWithClones;
