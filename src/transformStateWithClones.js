'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  let currentState = state;

  for (const action of actions) {
    let nextState;

    if (action.type === 'clear') {
      nextState = {};
    } else {
      nextState = { ...currentState };

      if (action.type === 'removeProperties') {
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
      }

      if (action.type === 'addProperties') {
        nextState = {
          ...nextState, ...action.extraData,
        };
      }
    }
    stateVersions.push(nextState);
    currentState = nextState;
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
