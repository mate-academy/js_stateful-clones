'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const transformatedState = [];

  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        adding(stateCopy, action);
        break;

      case 'removeProperties':
        removing(stateCopy, action);
        break;

      case 'clear':
        clearing(stateCopy);
        break;

      default:
        throw new Error('Invalid action type received');
    }
    transformatedState.push({ ...stateCopy });
  }

  return transformatedState;
}

function adding(state, action) {
  for (const key in action.extraData) {
    state[key] = action.extraData[key];
  }
}

function removing(state, action) {
  for (const key of action.keysToRemove) {
    delete state[key];
  }
}

function clearing(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
