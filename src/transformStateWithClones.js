'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const arr = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in copyState) {
            delete copyState[key];
          }
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw new Error(`Unknown action type:${type}`);
    }

    arr.push({ ...copyState });
  }

  return arr;
}

module.exports = transformStateWithClones;
