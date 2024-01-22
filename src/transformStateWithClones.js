'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties': {
        for (const removeKey of action.keysToRemove) {
          delete newState[removeKey];
        }
        break;
      }

      case 'clear': {
        for (const cleanKey in newState) {
          delete newState[cleanKey];
        }
        break;
      }
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
