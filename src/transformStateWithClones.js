'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);

        stateVersions.push({ ...copyState });

        break;

      case 'removeProperties':
        for (const propertyToRemove of action.keysToRemove) {
          delete copyState[propertyToRemove];
        }

        stateVersions.push({ ...copyState });

        break;

      case 'clear':
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }

        stateVersions.push({ ...copyState });

        break;

      default:

        break;
    }
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
