'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case 'clear':
        clearObject(newState);
        break;

      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        removeProperties(keysToRemove, newState);
        break;

      default:
        throw Error(`Wrong action: ${action.type}`);
    }

    stateVersions.push({ ...newState });
  }

  return stateVersions;

  function removeProperties(keysToRemove, object) {
    for (const keyToRemove of keysToRemove) {
      delete object[keyToRemove];
    }
  }

  function clearObject(object) {
    for (const key in object) {
      delete object[key];
    }
  }
}

module.exports = transformStateWithClones;
