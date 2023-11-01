'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformState(currentState, action) {
  switch (action.type) {
    case ('addProperties'):
      Object.assign(currentState, action.extraData);
      break;

    case ('removeProperties'):
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
      break;

    case ('clear'):
      for (const key of Object.keys(currentState)) {
        delete currentState[key];
      }
      break;

    default:
      throw new Error('Unknown action.type: ' + action.type);
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
