'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let temp = { ...state };
  const result = [];

  for (const action of actions) {
    temp = doAction(temp, action);
    result.push({ ...temp });
  }

  return result;
}

function doAction(state, action) {
  switch (action.type) {
    case 'addProperties':
      for (const key in action.extraData) {
        state[key] = action.extraData[key];
      }

      return state;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete state[key];
      }

      return state;

    case 'clear':
      for (const key in state) {
        delete state[key];
      }

      return state;
  }
}

module.exports = transformStateWithClones;
