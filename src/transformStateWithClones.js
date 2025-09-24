'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const values = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          newState = { ...currentState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove && typeof action.keysToRemove === 'object') {
          newState = { ...currentState };

          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }

        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    if (typeof newState === 'object') {
      values.push(newState);
      currentState = newState;
    }
  }

  return values;
}

module.exports = transformStateWithClones;
