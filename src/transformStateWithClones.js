'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
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

      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }

    previousVersions.push({
      ...stateCopy,
    });
  }

  return previousVersions;
}

module.exports = transformStateWithClones;
