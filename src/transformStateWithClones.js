'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone1 = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone1, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone1[key];
        }
        break;

      case 'clear':
        for (const key in clone1) {
          delete clone1[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push({ ...clone1 });
  }

  return result;
}

module.exports = transformStateWithClones;
