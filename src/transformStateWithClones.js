'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const states = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...key.extraData,
        };
        break;

      case 'removeProperties':
        key.keysToRemove.forEach(e => delete currentState[e]);
        break;

      case 'clear':
        Object.keys(currentState).forEach(e => delete currentState[e]);
        break;

      default:
        throw Error('invalid input');
    }
    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
