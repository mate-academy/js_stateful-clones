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
          ...copyState, ...action.extraData,
        };
        result.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        result.push({ ...copyState });
        break;

      case 'clear':
        copyState = {};
        result.push({ ...copyState });
        break;

      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
