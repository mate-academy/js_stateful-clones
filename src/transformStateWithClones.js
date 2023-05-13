'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {
    ...state,
  };
  const previousVersions = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          stateCopy[key] = actions[i].extraData[key];
        }
        break;
      case 'removeProperties':
        for (let x = 0; x < actions[i].keysToRemove.length; x++) {
          delete stateCopy[actions[i].keysToRemove[x]];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('Action must be one of the three declared');
    }

    previousVersions.push({
      ...stateCopy,
    });
  }

  return previousVersions;
}
module.exports = transformStateWithClones;
