'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    result.push({ ...modifyState(stateCopy, action) });
  }

  return result;
}

function modifyState(state, action) {
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

  return state;
}

module.exports = transformStateWithClones;
