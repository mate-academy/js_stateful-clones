'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const result = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.entries(action.extraData).forEach(([key, value]) => {
          copyState[key] = value;
        });

        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete copyState[key]);

        break;
      case 'clear':
        copyState = {};

        break;
      default:
        return state;
    }

    result.push({ ...copyState });
  });

  return result;
}

module.exports = transformStateWithClones;
