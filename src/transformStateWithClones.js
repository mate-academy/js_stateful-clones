'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const i of actions) {
    switch (i.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...i.extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of i.keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${i.type}`);
    }

    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
