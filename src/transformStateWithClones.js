'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // creating clone for state;
  const clonedState = { ...state };

  const allState = [];

  for (const action of actions) {
    transform(clonedState, action);

    const agg = { ...clonedState };

    allState.push(agg);
  }

  return allState;
}

function transform(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;

    case 'removeProperties': {
      for (const key of action.keysToRemove) {
        delete state[key];
      }

      break;
    }

    case 'clear': {
      for (const key of Object.keys(state)) {
        delete state[key];
      }

      break;
    }
  }
}

module.exports = transformStateWithClones;
