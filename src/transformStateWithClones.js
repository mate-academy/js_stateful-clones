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
        array.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const character of keysToRemove) {
          if (stateClone.hasOwnProperty(character)) {
            delete stateClone[character];
          }
        }
        array.push({ ...stateClone });
        break;

      case 'clear':
        stateClone = {};
        array.push({});
        break;

      default:
        array.push({ ...stateClone });
        break;
    }
  }

  return array;
}

module.exports = transformStateWithClones;
