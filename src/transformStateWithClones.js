'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    stateCopy = doAction(stateCopy, action);
    result.push({ ...stateCopy });
  }

  return result;
}

function doAction(state, action) {
  switch (action.type) {
    case 'addProperties':
      if (action.extraData && typeof action.extraData === 'object') {
        for (const key in action.extraData) {
          state[key] = action.extraData[key];
        }
      }

      return state;

    case 'removeProperties':
      if (Array.isArray(action.keysToRemove)) {
        for (const key of action.keysToRemove) {
          delete state[key];
        }
      }

      return state;

    case 'clear':
      return {};

    default:
      return state;
  }
}

module.exports = transformStateWithClones;
