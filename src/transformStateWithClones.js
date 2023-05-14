'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateVersions, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in stateVersions) {
            delete stateVersions[key];
          }
        }
        break;

      case 'clear':
        for (const key in stateVersions) {
          delete stateVersions[key];
        }
        break;

      default:
        return (`Invalid action type: ${action.type}`);
    }

    resultArray.push({ ...stateVersions });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
