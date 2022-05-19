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
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
    }

    if (action.type === 'clear') {
      for (const property in copyState) {
        delete copyState[property];
      }
    }

    states.push({ ...copyState });
  }

  return states;
}

module.exports = transformStateWithClones;
