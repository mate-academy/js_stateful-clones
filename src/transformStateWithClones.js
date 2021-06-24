'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateToModify = { ...state };
  const modifiedVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateToModify, action.extraData);

        modifiedVersions.push({ ...stateToModify });
        break;

      case 'removeProperties':
        for (const removableKey of action.keysToRemove) {
          delete stateToModify[removableKey];
        }
        modifiedVersions.push({ ...stateToModify });
        break;

      case 'clear':
        for (const keyToClear in stateToModify) {
          delete stateToModify[keyToClear];
        }
        modifiedVersions.push({ ...stateToModify });
        break;
    }
  }

  return modifiedVersions;
}

module.exports = transformStateWithClones;
