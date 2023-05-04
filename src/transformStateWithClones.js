'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const arrayOfClones = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(stateClone, extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete stateClone[key];
        }

        break;
      }

      case 'clear': {
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;
      }

      default:
        break;
    }

    arrayOfClones.push({ ...stateClone });
  }

  return arrayOfClones;
}

module.exports = transformStateWithClones;
