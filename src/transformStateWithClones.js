'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopies = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {
    const stateCopy = { ...stateCopies[i] };

    transform(stateCopy, actions[i]);
    stateCopies.push(stateCopy);
  }

  stateCopies.shift();

  return stateCopies;
}

function transform(state, action) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  const { type, extraData, keysToRemove } = action;

  switch (type) {
    case ADD_PROPERTIES:
      Object.assign(state, extraData);
      break;

    case REMOVE_PROPERTIES:
      for (const key of keysToRemove) {
        delete state[key];
      }

      break;

    case CLEAR:
      for (const key of Object.keys(state)) {
        delete state[key];
      }

      break;

    default:
      return state;
  }
}

module.exports = transformStateWithClones;
