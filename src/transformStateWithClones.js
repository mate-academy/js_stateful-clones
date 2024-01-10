'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };

  const arrayOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = Object.assign(newState, action.extraData);
        arrayOfState.push({ ...newState });
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        arrayOfState.push({ ...newState });
        break;

      case 'clear':
        newState = {};
        arrayOfState.push({ ...newState });
        break;

      default:
        newState = {};
    }
  }

  return arrayOfState;
}

module.exports = transformStateWithClones;
