'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        currentState = { ...currentState };
        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;

      case 'clear':
        currentState = {};
        break;
    }
    resultStates.push({ ...currentState });
  });

  return resultStates;
}

module.exports = transformStateWithClones;
