'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
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

      default:
        for (const key in newState) {
          delete newState[key];
        }

        result.push({ ...newState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
