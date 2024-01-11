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

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      currentState = {
        ...currentState, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };
      action.keysToRemove.forEach(key => delete currentState[key]);
    } else if (action.type === 'clear') {
      currentState = {};
    }

    result.push({ ...currentState });
  });

  return result;
}

module.exports = transformStateWithClones;
