'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let courentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(courentState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete courentState[key];
      }
    }

    if (action.type === 'clear') {
      courentState = {};
    }

    newState.push({ ...courentState });
  }

  return newState;
}

module.exports = transformStateWithClones;
