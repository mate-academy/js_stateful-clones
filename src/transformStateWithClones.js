'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateChanges = [];

  let copyState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        copyState = { ...copyState, ...extraData };
        break;

      case 'removeProperties':
        copyState = { ...copyState };

        for (const key of keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        return `Unknown action type: ${type}`;
    }

    stateChanges.push(copyState);
  }

  return stateChanges;
}

module.exports = transformStateWithClones;
