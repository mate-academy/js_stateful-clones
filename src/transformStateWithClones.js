'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    if (!action || !action.type) {
      throw new Error('Invalid action structure');
    }

    if (
      action.type === 'removeProperties' &&
      !Array.isArray(action.keysToRemove)
    ) {
      throw new Error('keysToRemove must be an array');
    }

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push({ ...currentState });
  });

  return states;
}

module.exports = transformStateWithClones;
