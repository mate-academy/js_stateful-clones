'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateAfterAction = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateAfterAction = {};
        break;

      case 'addProperties':
        stateAfterAction = { ...stateAfterAction, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateAfterAction[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    states.push({ ...stateAfterAction });
  }

  return states;
}

module.exports = transformStateWithClones;
