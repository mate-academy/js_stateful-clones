'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in stateClone) {
            delete stateClone[key];
          }
        };
        break;

      default:
        break;
    }

    stateVersions.push({ ...stateClone });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
