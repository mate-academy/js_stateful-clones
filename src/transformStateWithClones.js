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
    result.push({ ...updateState(stateCopy, action) });
  }

  return result;
}

function updateState(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;

    case 'removeProperties':
      action.keysToRemove.forEach(key => delete state[key]);
      break;

    case 'clear':
      Object.keys(state).forEach(key => delete state[key]);
      break;
  }

  return state;
}

module.exports = transformStateWithClones;
