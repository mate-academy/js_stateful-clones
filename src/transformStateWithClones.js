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
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete state[key];
      }

      break;

    case 'clear':
      for (const key of Object.keys(state)) {
        delete state[key];
      }

      break;

    default:
      return state;
  }
}

module.exports = transformStateWithClones;
