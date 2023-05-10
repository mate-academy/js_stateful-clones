'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObj = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }

        break;

      case 'addProperties':
        for (const key in action.extraData) {
          newObj[key] = action.extraData[key];
        }

        break;

      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }

        break;

      default:
        throw new Error('Unknown action type');
    }
    stateVersions.push({ ...newObj });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
