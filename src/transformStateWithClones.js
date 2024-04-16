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
        const keys = Object.keys(currentState);
        const keysToRemove = keys.filter((key) => action.keysToRemove.includes(key));

        const newState = {};

        keys.forEach((key) => {
          if (!keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }
        });

        currentState = { ...newState }
        break;

      default:
        break;
    }

    statesArray.push({ ...currentState });
  });

  return statesArray;
}

module.exports = transformStateWithClones;
