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
    let newStateClone = { ...stateClone };

    switch (type) {
      case 'addProperties':
        Object.assign(newStateClone, extraData);
        break;

      case 'removeProperties':
        for (const character of keysToRemove) {
          if (newStateClone.hasOwnProperty(character)) {
            delete newStateClone[character];
          }
        }
        break;

      case 'clear':
        newStateClone = {};
        break;

      default:
        break;
    }

    array.push(newStateClone);
    stateClone = newStateClone;
  }

  return array;
}

module.exports = transformStateWithClones;
