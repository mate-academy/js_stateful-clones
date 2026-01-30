'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copyState = {
          ...copyState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        const newState = { ...copyState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        copyState = newState;
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw new Error('Unknown type');
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
