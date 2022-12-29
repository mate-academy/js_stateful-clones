'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const toRemove of action.keysToRemove) {
          delete cloneState[toRemove];
        }
        break;

      case 'clear':
        for (const toClear in cloneState) {
          delete cloneState[toClear];
        }
        break;

      default:
        throw new Error('Unexpected state');
    }
    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
