'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const clones = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }

    clones.push({ ...stateCopy });
  }

  return clones;
}

module.exports = transformStateWithClones;
