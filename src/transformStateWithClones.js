'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arrayStateConditions = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        newState = { ...newState, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        newState = { ...newState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      default:
        break;
    }

    arrayStateConditions.push({ ...newState });
  }

  return arrayStateConditions;
}

module.exports = transformStateWithClones;
