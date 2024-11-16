'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTIONS = [...actions];
  let newState = { ...state };
  const result = [];

  for (const action of ACTIONS) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        result.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        result.push({ ...newState });
        break;

      case 'clear':
        newState = {};
        result.push({ ...newState });
        break;

      default:
        throw new Error('Unknown action type');
    }
  }

  return result;
}

module.exports = transformStateWithClones;
