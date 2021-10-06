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
    switch (action.type) {
      case 'addProperties':
        for (const keyToAdd in action.extraData) {
          copyState[keyToAdd] = action.extraData[keyToAdd];
        }

        versionsOfState.push({ ...copyState });

        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        }

        versionsOfState.push({ ...copyState });

        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }

        versionsOfState.push({ ...copyState });

        break;

      default:
    }
  }

  return versionsOfState;
}

module.exports = transformStateWithClones;
