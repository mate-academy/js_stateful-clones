'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const action of actions) {
    transform(newState, action);

    result.push({ ...newState });
  }

  return result;
}

function transform(state, action) {
  switch (action.type) {
    case 'addProperties': {
      Object.assign(state, action.extraData);

      break;
    }

    case 'removeProperties': {
      for (const item of action.keysToRemove) {
        if (state.hasOwnProperty(item)) {
          delete state[item];
        }
      }

      break;
    }

    case 'clear': {
      for (const key of Object.keys(state)) {
        delete state[key];
      }

      break;
    }

    default: {
      return state;
    }
  }
}

module.exports = transformStateWithClones;
