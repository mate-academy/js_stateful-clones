'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let stateClone = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const character of keysToRemove) {
          if (stateClone.hasOwnProperty(character)) {
            delete stateClone[character];
          }
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error('Unexpected action');
    }

    array.push({ ...stateClone });
  }

  return array;
}

module.exports = transformStateWithClones;
