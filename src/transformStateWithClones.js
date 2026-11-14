'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    const stateClone = { ...currentState };

    switch (action.type) {
      case 'clear':
        for (const key of Object.keys(stateClone)) {
          delete stateClone[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      default:
        break;
    }

    currentState = stateClone;
    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
