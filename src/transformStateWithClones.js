'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateCopy[property];
        }
        break;

      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateVersions.push({ ...stateCopy });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
