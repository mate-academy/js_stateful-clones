'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let nextState = { ...state };

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        for (const data in action.extraData) {
          nextState[data] = action.extraData[data];
        }
        break;

      case 'removeProperties':
        for (const toRemove of action.keysToRemove) {
          delete nextState[toRemove];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error('Unexpected state');
    }
    result.push({ ...nextState });
  }

  return result;
}

module.exports = transformStateWithClones;
