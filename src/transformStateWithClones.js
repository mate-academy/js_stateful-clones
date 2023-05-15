'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function removePropertiesFromState(copyState, keysToRemove) {
  for (const keyToRemove of keysToRemove) {
    delete copyState[keyToRemove];
  }
}

function deleteKeysFromState(copyState) {
  for (const key in copyState) {
    delete copyState[key];
  }
}

function transformStateWithClones(state, actions) {
  const stateVersions = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        removePropertiesFromState(copyState, keysToRemove);
        break;

      case 'clear':
        deleteKeysFromState(copyState);
        break;

      default:
        throw new Error(`Unknown action type ${type}`);
    }

    stateVersions.push({ ...copyState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
