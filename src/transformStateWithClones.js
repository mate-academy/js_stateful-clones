'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const result = actions.map((action) => {
    switch (action.type) {
      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };

        return { ...copyState, ...action.extraData };

      case 'removeProperties':
        if (action.keysToRemove) {
          action.keysToRemove.forEach((key) => delete copyState[key]);
        }

        return { ...copyState };

      default:
        copyState = {};

        return { ...copyState };
    }
  });

  return result;
}

module.exports = transformStateWithClones;
