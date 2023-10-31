'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformState(currentState, action) {
  if (action.type === 'addProperties') {
    Object.assign(currentState, action.extraData);
  }

  if (action.type === 'removeProperties') {
    for (const key of action.keysToRemove) {
      delete currentState[key];
    }
  }

  if (action.type === 'clear') {
    for (const key of Object.keys(currentState)) {
      delete currentState[key];
    }
  }
}

function transformStateWithClones(state, actions) {
  const copiedState = { ...state };
  const transformedStates = [];

  for (const action of actions) {
    transformState(copiedState, action);
    transformedStates.push({ ...copiedState });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
