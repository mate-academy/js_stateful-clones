'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      Object.entries(action.extraData).forEach(([key, value]) => {
        copyState[key] = value;
      });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => delete copyState[key]);
    }

    if (action.type === 'clear') {
      Object.keys(copyState).forEach(key => delete copyState[key]);
    }

    result.push({ ...copyState });
  });

  return result;
}

module.exports = transformStateWithClones;
