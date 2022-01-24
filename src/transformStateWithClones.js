'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const property in extraData) {
          stateCopy[property] = extraData[property];
        }
        break;

      case 'removeProperties':
        for (const property of keysToRemove) {
          delete stateCopy[property];
        }
        break;

      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;

      default:
        break;
    }

    stateVersions.push({ ...stateCopy });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
