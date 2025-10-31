/* eslint-disable no-unused-vars */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        currentState = newState;
        break;
      }

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = { transformStateWithClones };
