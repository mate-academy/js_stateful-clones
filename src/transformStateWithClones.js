'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const cloneOfState = { ...state };

  for (const action of actions) {
    const partOfResult = transform(cloneOfState, action);

    const cloneOfClone = { ...partOfResult };

    result.push(cloneOfClone);
  }

  return result;
}

function transform(state, action) {
  switch (action.type) {
    case 'addProperties': {
      Object.assign(state, action.extraData);

      return state;
    }

    case 'removeProperties': {
      for (const key of action.keysToRemove) {
        delete state[key];
      }

      return state;
    }

    case 'clear': {
      for (const key of Object.keys(state)) {
        delete state[key];
      }

      return state;
    }

    default: {
      return 'Error';
    }
  }
}

module.exports = transformStateWithClones;
