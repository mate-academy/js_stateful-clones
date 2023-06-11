'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const previousVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        previousVersions.push(Object.assign(stateCopy, action.extraData));
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete stateCopy[action.keysToRemove[key]];
        }
        previousVersions.push(stateCopy);
        break;

      case 'clear':
        previousVersions.push({});
        break;

      default:
        continue;
    }
  }

  return previousVersions;
}

module.exports = transformStateWithClones;
