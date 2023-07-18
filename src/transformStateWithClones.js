'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateCopies = [];

  for (const action of actions) {
    const actionType = action.type;

    switch (actionType) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        continue;
    }
    stateCopies.push({ ...newState });
  }

  return stateCopies;
}

module.exports = transformStateWithClones;
