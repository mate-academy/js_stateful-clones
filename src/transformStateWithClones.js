'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersion = [];
  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete newState[keyToRemove];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown type ${type}`);
    }

    stateVersion.push({ ...newState });
  }

  return stateVersion;
}

module.exports = transformStateWithClones;
