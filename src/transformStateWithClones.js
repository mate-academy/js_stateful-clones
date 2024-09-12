'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete currentState[property];
        }
        break;

      case 'clear':
        for (const property in currentState) {
          delete currentState[property];
        }
        break;

      default:
        break;
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
