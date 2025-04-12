'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsCopy = [];
  const stateNew = { ...state };

  for (const n of actions) {
    switch (n.type) {
      case 'addProperties':
        for (const val of Object.entries(n.extraData)) {
          stateNew[val[0]] = val[1];
        }
        break;

      case 'removeProperties':
        for (const val of n.keysToRemove) {
          if (Object.hasOwn(stateNew, val)) {
            delete stateNew[val];
          }
        }
        break;

      case 'clear':
        for (const entry of Object.entries(stateNew)) {
          delete stateNew[entry[0]];
        }
        break;
      default:
        break;
    }

    actionsCopy.push({ ...stateNew });
  }

  return actionsCopy;
}

module.exports = transformStateWithClones;
