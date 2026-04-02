'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateClone[key]);
        break;

      case 'clear':
        Object.keys(stateClone).forEach((key) => delete stateClone[key]);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push({ ...stateClone });
  }

  return states;
}

module.exports = transformStateWithClones;
