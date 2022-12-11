'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          stateCopy[data] = action.extraData[data];
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        };
        break;

      default:
        for (const item in stateCopy) {
          delete stateCopy[item];
        };
    }
    clones.push({ ...stateCopy });
  }

  return clones;
}

module.exports = transformStateWithClones;
