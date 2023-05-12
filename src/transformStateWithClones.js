'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  let copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        copyState = {
          ...copyState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw new Error(`Unknown action type ${type}`);
    }

    stateVersions.push({ ...copyState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
