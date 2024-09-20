'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const newArray = [];
  // const { type, extraData } = action;

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'clear':
        for (const del in copyState) {
          delete copyState[del];
        }
        break;

      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copyState[key];
        }
        break;
      default:
        return 'Error';
    }
    newArray.push({ ...copyState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
