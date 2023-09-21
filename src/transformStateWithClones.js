'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newArray = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(newState, key.extraData);
        break;

      case 'removeProperties':
        for (const value in key.keysToRemove) {
          delete newState[key.keysToRemove[value]];
        };
        break;

      case 'clear':
        for (const value in newState) {
          delete newState[value];
        }
        break;

      default:
        throw new Error('Invalid data');
    }
    newArray.push({ ...newState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
