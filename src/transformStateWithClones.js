'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const mass = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        newState = { ...newState, ...extraData };
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        newState = { ...newState };

        for (const k of keysToRemove) {
          delete newState[k];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    mass.push({ ...newState });
  }

  return mass;
}

module.exports = transformStateWithClones;
