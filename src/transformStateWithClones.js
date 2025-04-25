'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentStateCopy = { ...state };
  const newState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentStateCopy = {};
        break;

      case 'addProperties':
        currentStateCopy = { ...currentStateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        const stateCopy = { ...currentStateCopy };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        currentStateCopy = stateCopy;
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    newState.push({ ...currentStateCopy });
  }

  return newState;
}

module.exports = transformStateWithClones;
