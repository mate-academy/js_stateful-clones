'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  actions.forEach((action) => {
    let clonedState = { ...newState };

    if (action.type === 'addProperties') {
      Object.assign(clonedState, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        delete clonedState[key];
      });
    } else if (action.type === 'clear') {
      clonedState = {};
    }

    result.push(clonedState);
    newState = clonedState;
  });

  return result;
}

module.exports = transformStateWithClones;
