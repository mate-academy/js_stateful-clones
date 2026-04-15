'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
        break;
    }

    result.push(currentState);
  });

  return result;
}

module.exports = transformStateWithClones;