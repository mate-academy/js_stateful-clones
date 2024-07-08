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

  for (const action of actions) {
    const { extraData, type, keysToRemove } = action;

    switch (type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        throw new Error(`Unexpected action ${type}`);
    }
    states.push({ ...currentState });
  }

  return states;
}
module.exports = transformStateWithClones;
