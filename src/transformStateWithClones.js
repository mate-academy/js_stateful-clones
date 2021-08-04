'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfNewStates = [];
  const newState = { ...state };

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
        for (const property in newState) {
          delete newState[property];
        }

        break;

      default:
        break;
    }

    arrayOfNewStates.push({ ...newState });
  }

  return arrayOfNewStates;
}

module.exports = transformStateWithClones;
