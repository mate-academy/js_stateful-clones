'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arrStates = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        if (action.extraData && typeof action.extraData === 'object') {
          Object.assign(newState, action.extraData);
        }
        break;
      }

      case 'removeProperties': {
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }
        break;
      }

      case 'clear': {
        for (const key in newState) {
          delete newState[key];
        }
        break;
      }

      default:
        break;
    }

    arrStates.push({ ...newState });
  }

  return arrStates;
}

module.exports = transformStateWithClones;
