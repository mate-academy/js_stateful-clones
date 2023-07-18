'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }

    result.push({ ...newState });
  });

  return result;
}

module.exports = transformStateWithClones;
