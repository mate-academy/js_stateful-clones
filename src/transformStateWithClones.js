'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrState = [];
  let newState = { ...state };

  actions.forEach((action) => {
    if (action.type === 'clear') {
      newState = {};
      arrState.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete newState[key]);
      arrState.push({ ...newState });
    }

    if (action.type === 'addProperties') {
      newState = {
        ...newState,
        ...action.extraData,
      };
      arrState.push({ ...newState });
    }
  });

  return arrState;
}

module.exports = transformStateWithClones;
