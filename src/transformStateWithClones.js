'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const versions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateClone[key] = action.extraData[key];
        }
        versions.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateClone.hasOwnProperty(key)) {
            delete stateClone[key];
          }
        }
        versions.push({ ...stateClone });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        versions.push({ ...stateClone });
        break;

      default: {
        return 'Error';
      }
    }
  }

  return versions;
}

module.exports = transformStateWithClones;
