'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  let controllState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        controllState = {
          ...controllState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete controllState[keyToRemove];
        }
        break;

      case 'clear':
        controllState = {};
        break;

      default:
        throw new Error(`Unknown action type ${type}`);
    }

    stateVersions.push({ ...controllState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
