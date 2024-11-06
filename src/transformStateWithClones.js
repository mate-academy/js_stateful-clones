'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = { ...state };
  const result = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;
      case 'removeProperties':
        newState = { ...newState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    result.push({ ...newState });
  });

  return result;
}

module.exports = transformStateWithClones;
