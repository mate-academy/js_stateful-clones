'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        break;

      default: break;
    }

    states.push({ ...newState });
  }

  return states;
}
module.exports = transformStateWithClones;
