'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const localState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(localState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete localState[key];
        }
        break;
      case 'clear':
        for (const key in localState) {
          delete localState[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    result.push({ ...localState });
  }

  return result;
}

module.exports = transformStateWithClones;
