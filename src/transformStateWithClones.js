'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  actions.forEach((action) => {
    newState = { ...newState };

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((elem) => delete newState[elem]);
    } else if (action.type === 'clear') {
      newState = {};
    }

    result.push(newState);
  });

  return result;
}

module.exports = transformStateWithClones;
