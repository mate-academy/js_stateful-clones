'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateTransformations = [];
  let currentState = { ...state };

  for (const action of actions) {
    let modifiedState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(modifiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete modifiedState[key];
        }
        break;

      case 'clear':
        modifiedState = {};
        break;

      default:
        throw new Error(`Invalid action type: ${action.type}`);
    }

    currentState = modifiedState;
    stateTransformations.push(modifiedState);
  }

  return stateTransformations;
}

module.exports = transformStateWithClones;
