'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(newState, act.extraData);
        break;

      case 'removeProperties':
        for (const rem of act.keysToRemove) {
          delete newState[rem];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        result = [];
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
