'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versionsOfState = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          copyState[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        return 'Error: no actions';
    }

    versionsOfState.push({ ...copyState });
  }

  return versionsOfState;
}

module.exports = transformStateWithClones;
