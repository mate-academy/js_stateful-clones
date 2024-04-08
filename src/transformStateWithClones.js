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
    const { type, extraData, keysToRemove } = action;
    switch (type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ... currentState, ...extraData };
        break;

      case 'removeProperties':
       keysToRemove.forEach((key) => {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        });
        break;

      default:
        break;
    }
    statesArray.push({ ...currentState })
  });

  return statesArray;
}

module.exports = transformStateWithClones;
