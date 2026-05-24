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

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'addProperties') {
      currentState = {
        ...currentState,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      for (let j = 0; j < action.keysToRemove.length; j++) {
        delete currentState[action.keysToRemove[j]];
      }
    }

    if (action.type === 'clear') {
      currentState = {};
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
