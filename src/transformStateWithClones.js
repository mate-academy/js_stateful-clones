'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  const result = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        current = {};
        break;
      case 'addProperties':
        current = { ...current, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete current[key];
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    result.push({ ...current });
  });

  return result;
}

module.exports = transformStateWithClones;
