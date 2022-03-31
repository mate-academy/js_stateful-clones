'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesAllVersions = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'clear':
        Object.keys(stateCopy).forEach((key) => {
          delete stateCopy[key];
        });
        break;

      case 'removeProperties':
        keysToRemove.forEach((prop) => {
          delete stateCopy[prop];
        });
        break;

      default:
        break;
    }

    statesAllVersions.push({ ...stateCopy });
  }

  return statesAllVersions;
}

module.exports = transformStateWithClones;
