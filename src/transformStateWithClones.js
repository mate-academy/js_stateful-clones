'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const changes = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(newState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(newState, action.keysToRemove);
        break;

      case 'clear':
        for (const prop in newState) {
          delete newState[prop];
        }
        break;
    }

    changes.push({ ...newState });
  }

  return changes;
}

function addProperties(state, action) {
  for (const prop in action) {
    state[prop] = action[prop];
  }

  return state;
}

function removeProperties(state, action) {
  for (const prop of action) {
    delete state[prop];
  }
}

module.exports = transformStateWithClones;
