'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];

  let currentState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const copy = { ...currentState };
        action.keysToRemove.forEach((key) => {
          delete copy[key];
        });

        currentState = { ...copy };
        break;

      default:
        break;
    }

    statesArray.push(currentState);
  });

  return statesArray;
}

module.exports = transformStateWithClones;
