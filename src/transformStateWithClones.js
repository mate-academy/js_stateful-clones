'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const statesAllVersions = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'removeProperties' :
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }

    statesAllVersions.push({ ...stateCopy });
  }

  return statesAllVersions;
}

module.exports = transformStateWithClones;
