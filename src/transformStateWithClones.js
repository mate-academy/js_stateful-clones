'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = Object.assign({}, state);
  const states = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    } else if (action.type === 'clear') {
      currentState = {};
    }
    states.push({ ...currentState });
  });

  return states;
}

module.exports = transformStateWithClones;
