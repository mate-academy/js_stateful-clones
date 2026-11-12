'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  const states = [];

  let currentState = stateCopy;

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        states.push(currentState);
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        states.push(currentState);
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        states.push(currentState);
        break;

      default:
        throw new Error('unknown type' + action.type);
    }
  }

  return states;
}

module.exports = transformStateWithClones;
