'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = { ...state };
  const clonesArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clones, extraData);
        break;

      case 'clear':
        for (const clone in clones) {
          delete clones[clone];
        }
        break;

      case 'removeProperties':
        for (const removableKey of keysToRemove) {
          delete clones[removableKey];
        }
        break;

      default:
    }
    clonesArray.push({ ...clones });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
