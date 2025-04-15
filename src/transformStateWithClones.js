'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let copyState = { ...state };

  return actions.map((action) => {
    switch (action.type) {
      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };

        return { ...copyState };

      case 'removeProperties':
        for (const key in copyState) {
          if (action.keysToRemove.includes(key)) {
            delete copyState[key];
          }
        }

        return { ...copyState };

      default:
        copyState = {};

        return { ...copyState };
    }
  });
}

module.exports = transformStateWithClones;
