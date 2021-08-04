'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfNewStates = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        break;

      case 'clear':
        newState = {};

        break;

      default:
        break;
    }

    arrayOfNewStates.push({ ...newState });
  }

  return arrayOfNewStates;
}

module.exports = transformStateWithClones;
