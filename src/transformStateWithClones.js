'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const states = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const keyR of action.keysToRemove) {
        delete copyState[keyR];
      }
    }

    if (action.type === 'clear') {
      Object.keys(copyState).forEach((key) => delete copyState[key]);
    }

    states.push({ ...copyState });
  }

  return states;
}

module.exports = transformStateWithClones;
