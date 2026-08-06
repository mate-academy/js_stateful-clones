'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  let currentState = state;

  for (const { type, extraData = {}, keysToRemove = [] } of actions) {
    currentState = { ...currentState };

    switch (type) {
      case 'addProperties':
        for (const [k, v] of Object.entries(extraData)) {
          currentState[k] = v;
        }
        states.push(currentState);
        break;
      case 'removeProperties':
        for (const k of keysToRemove) {
          delete currentState[k];
        }
        states.push(currentState);
        break;
      case 'clear':
        currentState = {};
        states.push(currentState);
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  }

  return states;
}

module.exports = transformStateWithClones;
