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
    if (action.type === 'removeProperties') {
      for (const el of action.keysToRemove) {
        delete copyState[el];
      }
    }

    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    }

    if (action.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
    }
    states.push({ ...copyState });
  }

  return states;
}

module.exports = transformStateWithClones;
