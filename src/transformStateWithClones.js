'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = { ...state };
  const array = [];

  for (const data of actions) {
    switch (data.type) {
      case 'addProperties':
        Object.assign(stateClone, data.extraData);
        break;

      case 'removeProperties':
        for (const value of data.keysToRemove) {
          delete stateClone[value];
        }
        break;

      case 'clear':
        for (const value in stateClone) {
          delete stateClone[value];
        }
        break;

      default:
        break;
    }

    array.push({ ...stateClone });
  }

  return array;
}

module.exports = transformStateWithClones;
