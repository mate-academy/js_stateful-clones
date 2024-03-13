'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopies = [];
  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        newState = {};
        stateCopies.push({ ...newState });
        break;

      case 'addProperties':
        newState = { ...newState, ...extraData };
        stateCopies.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        stateCopies.push({ ...newState });
        break;

      default:
        break;
    }
  }

  return stateCopies;
}

module.exports = transformStateWithClones;
